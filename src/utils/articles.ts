import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n';
import { translateDiagram } from '@/i18n/diagram-labels';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content: string;
}

const codeFence = /^```[^\n]*\n[\s\S]*?^```/gm;
const indonesianSource = new Set(['data-roles-explained', 'deploy-like-a-pro']);

function articleContent(source: string, translation: string, slug: string, locale: Locale): string {
  const blocks = source.match(codeFence) ?? [];
  const tokens = [...translation.matchAll(/\{\{SOURCE_CODE_(\d+)\}\}/g)];

  if (tokens.length !== blocks.length || tokens.some((token, index) => Number(token[1]) !== index + 1)) {
    throw new Error(`Translation ${slug} must reference all ${blocks.length} source code blocks in order`);
  }

  return translation.replace(/\{\{SOURCE_CODE_(\d+)\}\}/g, (_, index: string) =>
    translateDiagram(blocks[Number(index) - 1], slug, locale));
}

function readArticle(slug: string, locale: Locale): Article {
  const sourcePath = path.join(articlesDirectory, `${slug}.mdx`);
  const source = matter(fs.readFileSync(sourcePath, 'utf8'));
  const translatedPath = path.join(articlesDirectory, locale, `${slug}.mdx`);
  const sourceLocale: Locale = indonesianSource.has(slug) ? 'id' : 'en';
  if (locale !== sourceLocale && !fs.existsSync(translatedPath)) {
    throw new Error(`Missing ${locale} translation for ${slug}`);
  }
  const translated = locale !== sourceLocale
    ? matter(fs.readFileSync(translatedPath, 'utf8'))
    : source;
  const data = translated.data;
  const content = translated === source
    ? source.content
    : articleContent(source.content, translated.content, slug, locale);

  return {
    title: data.title || source.data.title || '',
    description: data.description || source.data.description || '',
    date: source.data.date || '',
    readTime: locale === 'en' ? source.data.readTime || '' : (source.data.readTime || '').replace('min read', locale === 'id' ? 'menit baca' : 'menit maca'),
    tags: source.data.tags || [],
    slug,
    content,
  };
}

export function getAllArticles(locale: Locale = 'en'): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  
  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => readArticle(fileName.replace(/\.mdx$/, ''), locale));

  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string, locale: Locale = 'en'): Article | null {
  // Slugs always come from the root article index; never construct a path from
  // an unverified URL segment.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const sourcePath = path.join(articlesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) return null;
  return readArticle(slug, locale);
}
