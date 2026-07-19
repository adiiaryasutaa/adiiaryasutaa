import { Octokit } from "@octokit/rest";
import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

export interface BinaryFile {
  path: string;
  content: Buffer;
}

function useLocalFS() {
  const root = process.cwd();

  return {
    async getFile(path: string) {
      const content = readFileSync(join(root, path), "utf-8");
      return { sha: "", content };
    },

    async listDir(path: string) {
      const entries = readdirSync(join(root, path));
      return entries.map((name) => {
        const stat = statSync(join(root, path, name));
        return { name, type: stat.isDirectory() ? "dir" : "file", path: `${path}/${name}` };
      });
    },

    async putFile(path: string, content: string, _message: string, _sha?: string) {
      writeFileSync(join(root, path), content, "utf-8");
      return { data: { commit: { sha: "" } } };
    },

    async putFiles(files: BinaryFile[], _message: string) {
      for (const file of files) {
        const target = join(root, file.path);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, file.content);
      }
      return { sha: "" };
    },

    async deleteFile(path: string, _message: string, _sha: string) {
      unlinkSync(join(root, path));
      return { data: {} };
    },
  };
}

function useRemoteGitHub() {
  const cfg = useRuntimeConfig();
  const octokit = new Octokit({ auth: cfg.githubContentPat });
  const owner = cfg.githubContentRepoOwner;
  const repo = cfg.githubContentRepoName;
  const branch = cfg.githubContentBranch;

  return {
    async getFile(path: string) {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (Array.isArray(data) || data.type !== "file") throw new Error("Not a file");
      return {
        sha: data.sha,
        content: Buffer.from(data.content, "base64").toString("utf-8"),
      };
    },

    async listDir(path: string) {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (!Array.isArray(data)) throw new Error("Not a directory");
      return data;
    },

    async putFile(path: string, content: string, message: string, sha?: string) {
      return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        branch,
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        ...(sha ? { sha } : {}),
      });
    },

    // Writes several binary files in a single commit via the git tree API.
    // putFile is UTF-8 only and one-file-per-commit; uploading a batch through it
    // would corrupt the bytes and produce one redeploy per photo.
    async putFiles(files: BinaryFile[], message: string) {
      const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
      const parentSha = ref.object.sha;

      const { data: parent } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: parentSha,
      });

      const tree = await Promise.all(
        files.map(async (file) => {
          const { data: blob } = await octokit.git.createBlob({
            owner,
            repo,
            content: file.content.toString("base64"),
            encoding: "base64",
          });
          return {
            path: file.path,
            mode: "100644" as const,
            type: "blob" as const,
            sha: blob.sha,
          };
        })
      );

      const { data: newTree } = await octokit.git.createTree({
        owner,
        repo,
        base_tree: parent.tree.sha,
        tree,
      });

      const { data: commit } = await octokit.git.createCommit({
        owner,
        repo,
        message,
        tree: newTree.sha,
        parents: [parentSha],
      });

      await octokit.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: commit.sha });

      return { sha: commit.sha };
    },

    async deleteFile(path: string, message: string, sha: string) {
      return octokit.repos.deleteFile({ owner, repo, path, branch, message, sha });
    },
  };
}

export function useGitHub() {
  return import.meta.dev ? useLocalFS() : useRemoteGitHub();
}
