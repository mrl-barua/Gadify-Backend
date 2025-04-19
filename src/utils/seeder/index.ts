import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const target = args[0];

const seedersDir = path.join(__dirname);

if (target) {
  const filePath = path.join(seedersDir, `${target}.ts`);
  if (fs.existsSync(filePath)) {
    console.log(`Running seeder: ${target}`);
    execSync(`ts-node ${filePath}`, { stdio: "inherit" });
  } else {
    console.error(`Seeder file "${target}.ts" not found.`);
  }
} else {
  console.log("Running all seeders...");
  const files = fs
    .readdirSync(seedersDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts");

  for (const file of files) {
    const fullPath = path.join(seedersDir, file);
    console.log(`Running ${file}...`);
    execSync(`ts-node ${fullPath}`, { stdio: "inherit" });
  }
}
