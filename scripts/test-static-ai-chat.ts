import * as assert from "node:assert/strict";
import { getStaticAIReply, STATIC_CHAT_SUGGESTIONS } from "../src/utils/static-ai-chat";

assert.ok(Array.isArray(STATIC_CHAT_SUGGESTIONS), "suggestions should be an array");
assert.ok(STATIC_CHAT_SUGGESTIONS.length >= 4, "suggestions should contain starter questions");

const profileReply = getStaticAIReply("zainal itu siapa?");
assert.match(profileReply, /Data Engineer/i, "profile reply should mention Data Engineer");
assert.match(profileReply, /Indivara/i, "profile reply should mention current company Indivara");

const dataReply = getStaticAIReply("apa fokus data engineering zainal?");
assert.match(dataReply, /SQL/i, "data reply should mention SQL");
assert.match(dataReply, /Python/i, "data reply should mention Python");
assert.match(dataReply, /pipeline/i, "data reply should mention pipeline");

const experienceReply = getStaticAIReply("pengalaman kerja zainal apa saja?");
assert.match(experienceReply, /Indivara/i, "experience reply should mention Indivara Group");
assert.match(experienceReply, /Delman/i, "experience reply should mention Delman");

const skillReply = getStaticAIReply("skill utama apa?");
assert.match(skillReply, /SQL/i, "skill reply should mention SQL");
assert.match(skillReply, /TypeScript/i, "skill reply should mention TypeScript");

const projectReply = getStaticAIReply("project yang pernah dibuat?");
assert.match(projectReply, /Spotify/i, "project reply should mention Spotify clone");

const fallbackReply = getStaticAIReply("berapa harga bitcoin hari ini?");
assert.match(fallbackReply, /tentang Zainal/i, "fallback should keep scope about Zainal");

console.log("static AI chat tests passed");
