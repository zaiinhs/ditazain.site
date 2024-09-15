"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  "use server";
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`CREATE TABLE IF NOT EXISTS love_notes (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, messages TEXT NOT NULL, presence BOOLEAN NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NOT NULL DEFAULT NOW(), deleted_at TIMESTAMP);`;
  const name = formData.get("name");
  const messages = formData.get("messages");
  const presence = formData.get("presence");
  await sql("INSERT INTO love_notes (name, messages, presence) VALUES ($1, $2, $3)", [name, messages, presence]);
  revalidatePath("/");
}
