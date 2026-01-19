import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export function getSiteData() {
  const filePath = path.join(process.cwd(), "src", "data", "site.yml");
  const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw);
}
