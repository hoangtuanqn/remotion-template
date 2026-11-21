// Dev-only: khi xóa composition trong Studio (chuột phải > Delete), Studio chỉ xóa
// dòng <Composition> trong Root.tsx. Watcher này xóa nốt mọi file liên quan.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rootFile = path.join(root, "src", "Root.tsx");
const ID_RE = /<(?:Composition|Still)\b[\s\S]{0,200}?\bid=["']([A-Za-z0-9_-]+)["']/g;

const readIds = (): Set<string> => {
  const src = fs.readFileSync(rootFile, "utf8");
  return new Set([...src.matchAll(ID_RE)].map((m) => m[1]));
};

const rm = (p: string) => {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
  console.log(`[cleanup] removed ${path.relative(root, p)}`);
};

const cleanup = (id: string) => {
  rm(path.join(root, "src", id));
  for (const d of ["audio", "content", "repos"]) rm(path.join(root, "public", d, id));
  rm(path.join(root, "out", "content-research", id));
  rm(path.join(root, "out", "repo-research", id));
  // out/<id>.mp4, out/<id>_v2.mp4, out/<id>/ ...
  const out = path.join(root, "out");
  if (fs.existsSync(out)) {
    for (const f of fs.readdirSync(out)) {
      if (f === id || f.startsWith(`${id}.`) || f.startsWith(`${id}_`)) rm(path.join(out, f));
    }
  }
  // scripts/*.ts nhắc tới id dạng chuỗi ("Id") là script sinh audio của nó
  const scriptsDir = path.join(root, "scripts");
  const quoted = new RegExp(`["'\`]${id}["'\`]`);
  for (const f of fs.readdirSync(scriptsDir)) {
    const p = path.join(scriptsDir, f);
    if (f.endsWith(".ts") && quoted.test(fs.readFileSync(p, "utf8"))) rm(p);
  }
  // import mồ côi trong Root.tsx
  const src = fs.readFileSync(rootFile, "utf8");
  const importRe = new RegExp(String.raw`import[^;]*?from\s+["']\./${id}/[^"']*["'];?\r?\n?`, "g");
  const next = src.replace(importRe, "");
  if (next !== src) fs.writeFileSync(rootFile, next);
};

export const watchCompositionDeletes = () => {
  let known = readIds();
  let timer: NodeJS.Timeout | undefined;
  fs.watch(rootFile, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        const now = readIds();
        for (const id of known) if (!now.has(id)) cleanup(id);
        known = now;
      } catch (e) {
        console.error("[cleanup] failed", e);
      }
    }, 500);
  }).unref();
};
