import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const root = fs.realpathSync(process.cwd());
const stage = path.join(root, ".pages-build");
const output = path.join(root, "out");
function clearGenerated(directory) {
  if (path.dirname(directory) !== root || ![".pages-build", "out"].includes(path.basename(directory))) {
    throw new Error("Unexpected generated directory");
  }
  if (fs.existsSync(directory) && fs.lstatSync(directory).isSymbolicLink()) {
    throw new Error("Refusing to replace a linked directory");
  }
  fs.rmSync(directory, { recursive: true, force: true });
}
clearGenerated(stage);
fs.mkdirSync(stage);
for (const entry of ["app", "components", "hooks", "lib", "public", "package.json", "tsconfig.json", "next.config.ts", "postcss.config.mjs"]) {
  fs.cpSync(path.join(root, entry), path.join(stage, entry), {
    recursive: true,
    filter: (source) => source !== path.join(root, "app", "api"),
  });
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/Howard-Saffold";
const contactFile = path.join(stage, "app/contact/page.tsx");
let contact = fs.readFileSync(contactFile, "utf8");
contact = contact.replace('"force-dynamic"', '"force-static"');
contact = contact.replace(/const enabled = Boolean\([\s\S]*?\n  \);/, "const enabled = false;");
fs.writeFileSync(contactFile, contact);
for (const file of ["robots.ts", "sitemap.ts"]) {
  fs.appendFileSync(path.join(stage, "app", file), '\nexport const dynamic = "force-static";\n');
}
const cssPath = path.join(stage, "app/globals.css");
fs.writeFileSync(cssPath, fs.readFileSync(cssPath, "utf8").replaceAll('url("/fonts/', `url("${basePath}/fonts/`));
const configPath = path.join(stage, "tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
tsconfig.compilerOptions.incremental = false;
fs.writeFileSync(configPath, JSON.stringify(tsconfig, null, 2));
const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  cwd: stage,
  stdio: "inherit",
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || `https://webprod1.github.io${basePath}`,
    CONTACT_TO: "",
    CONTACT_FROM: "",
    RESEND_API_KEY: "",
    NEXT_TELEMETRY_DISABLED: "1",
  },
});
if (result.status !== 0) process.exit(result.status || 1);
clearGenerated(output);
fs.cpSync(path.join(stage, "out"), output, { recursive: true });
fs.writeFileSync(path.join(output, ".nojekyll"), "");
console.log(`GitHub Pages export ready: ${output}`);
