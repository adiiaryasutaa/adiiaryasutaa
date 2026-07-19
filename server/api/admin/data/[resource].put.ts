const ALLOWED = new Set([
  "project",
  "skill",
  "tech",
  "tool",
  "friend",
  "gallery",
  "experience/work",
  "experience/education",
  "experience/volunteer",
  "seo",
  "pages",
]);

export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const resource = getRouterParam(event, "resource") as string;
  if (!ALLOWED.has(resource)) {
    throw createError({ statusCode: 400, statusMessage: `Unknown resource: ${resource}` });
  }
  const body = await readBody<{ data: unknown; sha: string }>(event);
  // The local-FS backend used in dev has no shas and returns "", which is falsy —
  // a truthiness check here rejected every save outside production.
  if (!body?.data || typeof body?.sha !== "string") {
    throw createError({ statusCode: 400, statusMessage: "Missing data or sha" });
  }
  const gh = useGitHub();
  await gh.putFile(
    `data/${resource}.json`,
    JSON.stringify(body.data, null, 2),
    `chore(admin): update data/${resource}.json`,
    body.sha
  );
  return { ok: true, redeployInSeconds: 30 };
});
