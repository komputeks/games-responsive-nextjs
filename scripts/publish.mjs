import { readFile } from "node:fs/promises";

const token = process.env.GITHUB_PAT;
if (!token || process.env.VERCEL_ENV !== "production") process.exit(0);
const owner = "Komputeks";
const repoName = "games-responsive-nextjs";
const files = ["package.json","package-lock.json","next.config.ts","tsconfig.json","postcss.config.mjs","app/layout.tsx","app/page.tsx","app/globals.css","public/favicon.svg","scripts/publish.mjs"];
async function api(endpoint, init = {}) {
  const response = await fetch(`https://api.github.com${endpoint}`, { ...init, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json", ...init.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `GitHub ${response.status}`);
  return data;
}
try {
  let exists = true;
  try { await api(`/repos/${owner}/${repoName}`); } catch { exists = false; }
  if (!exists) await api("/user/repos", { method:"POST", body:JSON.stringify({ name:repoName, description:"Responsive gaming website recreated with Next.js 16", private:false }) });
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const current = await api(`/repos/${owner}/${repoName}/contents/${file}`).catch(() => null);
    await api(`/repos/${owner}/${repoName}/contents/${file}`, { method:"PUT", body:JSON.stringify({ message:`Add ${file}`, content:Buffer.from(content).toString("base64"), branch:"main", committer:{ name:owner, email:"xpatworld2021@gmail.com" }, ...(current?.sha ? { sha:current.sha } : {}) }) });
  }
  console.log(`Published ${owner}/${repoName}`);
} catch (error) { console.error("GitHub publish failed:", error.message); process.exit(1); }
