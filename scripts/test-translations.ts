import * as assert from "node:assert/strict";
import { getAllArticles, getArticleBySlug } from "../src/utils/articles";
import { LOCALES, localizedPath } from "../src/i18n";

const source = getAllArticles("en");
assert.equal(source.length, 12, "all source articles should be indexed");

for (const locale of LOCALES) {
  const articles = getAllArticles(locale);
  assert.deepEqual(
    articles.map(({ slug }) => slug),
    source.map(({ slug }) => slug),
    `article index should be stable for ${locale}`
  );

  for (const article of articles) {
    const original = getArticleBySlug(article.slug, "id")!;
    const expectedBlocks = [...original.content.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].length;
    const actualBlocks = [...article.content.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].length;
    assert.equal(actualBlocks, expectedBlocks, `${locale}/${article.slug}: source examples missing`);
    assert.doesNotMatch(article.content, /\{\{SOURCE_CODE_\d+\}\}/);
    assert.ok(article.title && article.description && article.content.trim());
  }
}

assert.equal(localizedPath("en", "/jv/articles/example"), "/articles/example");
assert.equal(localizedPath("id", "/jv/articles/example"), "/id/articles/example");
assert.equal(localizedPath("jv", "/id"), "/jv");
assert.match(getArticleBySlug("data-roles-explained", "en")!.title, /Who Does What/);
assert.match(getArticleBySlug("data-roles-explained", "jv")!.title, /Apa Bedane/);
assert.match(getArticleBySlug("deploy-like-a-pro", "id")!.content, /Platform Managed/);

console.log("translations verified for 12 articles in 3 languages");
