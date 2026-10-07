import { fail, insertLead, phoneField, readJson, textField, dbError } from "@/lib/http";
import { getTool } from "@/lib/catalog";

export async function POST(request: Request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return fail(parsed.error);
  const name = textField(parsed.body.name, 2, 80);
  const phone = phoneField(parsed.body.phone);
  const company = textField(parsed.body.company, 0, 80) ?? "";
  const interestRaw = textField(parsed.body.interest, 0, 80) ?? "";
  const message = textField(parsed.body.message, 0, 1000) ?? "";
  if (!name || !phone) return fail("الاسم والجوال مطلوبان، والجوال من 8 إلى 15 رقماً.");
  const interest = interestRaw && getTool(interestRaw) ? interestRaw : interestRaw.slice(0, 80);
  try {
    const id = await insertLead({ name, phone, company, interest, message });
    return Response.json({ ok: true, id });
  } catch {
    return dbError();
  }
}
