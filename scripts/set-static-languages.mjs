import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// The shared root layout cannot read the route locale in a static export.
// Set the pre-rendered document language too, so crawlers and no-JS clients
// receive the correct language before the client-side pathname sync runs.
const output = join(process.cwd(), "out");

async function updateDirectory(directory, locale) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      count += await updateDirectory(file, locale);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const original = await readFile(file, "utf8");
      if (!original.includes('<html lang="en"')) {
        throw new Error(`Expected English document language in ${file}`);
      }
      await writeFile(file, original.replace('<html lang="en"', `<html lang="${locale}"`));
      count += 1;
    }
  }
  return count;
}

for (const locale of ["id", "jv"]) {
  const root = join(output, `${locale}.html`);
  const document = await readFile(root, "utf8");
  if (!document.includes('<html lang="en"')) {
    throw new Error(`Expected English document language in ${root}`);
  }
  await writeFile(root, document.replace('<html lang="en"', `<html lang="${locale}"`));
  const count = 1 + await updateDirectory(join(output, locale), locale);
  console.log(`Set lang=${locale} on ${count} static pages`);
}
