import { createHmac, timingSafeEqual } from "node:crypto";

export const DESK_COOKIE = "risha_desk";

export function deskSignature(token: string) {
  return createHmac("sha256", token).update("risha-desk-v1").digest("hex");
}

export function tokensMatch(given: string, expected: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length === 0 || a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
