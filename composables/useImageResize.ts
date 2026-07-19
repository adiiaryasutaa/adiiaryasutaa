// Downscales photos in the browser before upload. sharp is not a dependency and
// resizing server-side would push multi-MB originals through the request body,
// which Vercel caps at 4.5 MB.

// Large enough to serve the lightbox at full width on a 2x display, and well
// under Vercel's 8192px source-image ceiling.
const MAX_EDGE = 2000;
const QUALITY = 0.82;

// The upload endpoint rejects batches over 3.5 MB; leave headroom for the
// multipart field overhead that rides along with the bytes.
const CHUNK_BYTES = 3 * 1024 * 1024;

export function useImageResize() {
  async function resize(file: File): Promise<File> {
    // from-image applies the EXIF rotation phone cameras rely on; without it
    // portrait shots decode sideways.
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );
    if (!blob) throw new Error(`Could not encode ${file.name}`);

    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
      type: "image/webp",
    });
  }

  // Groups files into batches that each fit the endpoint's size cap. Every batch
  // is one commit, so a normal upload is one; seeding dozens at once is a few.
  function chunk(files: File[]): File[][] {
    const chunks: File[][] = [];
    let current: File[] = [];
    let bytes = 0;

    for (const file of files) {
      if (current.length && bytes + file.size > CHUNK_BYTES) {
        chunks.push(current);
        current = [];
        bytes = 0;
      }
      current.push(file);
      bytes += file.size;
    }
    if (current.length) chunks.push(current);

    return chunks;
  }

  return { resize, chunk };
}
