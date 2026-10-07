"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DESK_COOKIE, deskSignature, tokensMatch } from "@/lib/desk-token";

export async function unlockDesk(formData: FormData) {
  const expected = process.env.DESK_TOKEN ?? "";
  const given = String(formData.get("token") ?? "");
  if (!tokensMatch(given, expected)) {
    return { ok: false as const, error: "المفتاح غير مطابق." };
  }
  const jar = await cookies();
  jar.set(DESK_COOKIE, deskSignature(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/desk",
    maxAge: 60 * 60 * 12,
  });
  redirect("/desk");
}

export async function deskUnlocked() {
  const expected = process.env.DESK_TOKEN;
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(DESK_COOKIE)?.value ?? "";
  const good = deskSignature(expected);
  return tokensMatch(value, good);
}
