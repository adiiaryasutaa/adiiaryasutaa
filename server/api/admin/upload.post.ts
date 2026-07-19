import type { BinaryFile } from "../../utils/github";

// Fixed destination. The section used to come from the form body and flowed
// straight into the commit path, so any caller could write outside the images dir.
const DIR = "public/assets/imgs/gallery";
const URL_PREFIX = "/assets/imgs/gallery";

const MAX_FILE_BYTES = 2 * 1024 * 1024;
// Vercel functions reject request bodies over 4.5 MB; stay under it with room
// for multipart overhead. The client chunks batches to match.
const MAX_BATCH_BYTES = 3.5 * 1024 * 1024;

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// Identify the format from the bytes themselves. The upload's mime type and
// filename extension are both attacker-controlled and neither is evidence of
// what the file actually contains.
function sniffImageType(buffer: Buffer): "jpg" | "png" | "webp" | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(PNG_MAGIC)) {
    return "png";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

function slugify(name: string) {
  const slug = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "photo";
}

export default defineEventHandler(async (event) => {
  await assertAdmin(event);

  const formData = await readFormData(event);
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (!files.length) {
    throw createError({ statusCode: 400, statusMessage: "No files provided" });
  }

  const stamp = Date.now();
  const uploads: BinaryFile[] = [];
  const urls: string[] = [];
  let batchBytes = 0;

  for (const [i, file] of files.entries()) {
    const content = Buffer.from(await file.arrayBuffer());

    if (content.byteLength > MAX_FILE_BYTES) {
      throw createError({
        statusCode: 413,
        statusMessage: `${file.name} is larger than 2 MB`,
      });
    }

    const ext = sniffImageType(content);
    if (!ext) {
      throw createError({
        statusCode: 415,
        statusMessage: `${file.name} is not a JPEG, PNG, or WebP image`,
      });
    }

    batchBytes += content.byteLength;
    if (batchBytes > MAX_BATCH_BYTES) {
      throw createError({
        statusCode: 413,
        statusMessage: "Batch is larger than 3.5 MB — upload fewer photos at once",
      });
    }

    // The index disambiguates files landing in the same millisecond.
    const filename = `${slugify(file.name)}-${stamp}-${i}.${ext}`;
    uploads.push({ path: `${DIR}/${filename}`, content });
    urls.push(`${URL_PREFIX}/${filename}`);
  }

  const gh = useGitHub();
  await gh.putFiles(
    uploads,
    `chore(admin): upload ${uploads.length} gallery photo${uploads.length === 1 ? "" : "s"}`
  );

  return { ok: true, urls };
});
