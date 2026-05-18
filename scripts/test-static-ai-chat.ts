import * as assert from "node:assert/strict";
import { getStaticAIReply, STATIC_CHAT_SUGGESTIONS } from "../src/utils/static-ai-chat";

assert.ok(Array.isArray(STATIC_CHAT_SUGGESTIONS), "suggestions should be an array");
assert.ok(STATIC_CHAT_SUGGESTIONS.length >= 4, "suggestions should contain starter questions");

const experienceReply = getStaticAIReply("pengalaman kerja zainal apa saja?");
assert.match(experienceReply, /delman\.io/i, "experience reply should mention delman.io");
assert.match(experienceReply, /Frontend/i, "experience reply should mention frontend role");

const skillReply = getStaticAIReply("skill utama apa?");
assert.match(skillReply, /React/i, "skill reply should mention React");
assert.match(skillReply, /TypeScript/i, "skill reply should mention TypeScript");

const projectReply = getStaticAIReply("project yang pernah dibuat?");
assert.match(projectReply, /Spotify/i, "project reply should mention Spotify clone");

const fallbackReply = getStaticAIReply("berapa harga bitcoin hari ini?");
assert.match(fallbackReply, /tentang Zainal/i, "fallback should keep scope about Zainal");

console.log("static AI chat tests passed");
