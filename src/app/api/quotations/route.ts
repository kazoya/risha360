import { dbError, fail, parseQuote, readJson } from "@/lib/http";
import { requireSql } from "@/lib/db";

export async function POST(request: Request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return fail(parsed.error);
  const quote = parseQuote(parsed.body);
  if (!quote.ok) return fail(quote.error);
  const value = quote.value;
  try {
    const sql = requireSql();
    const rows = await sql`
      INSERT INTO quotations (client_name, notes, vat_rate, subtotal, vat_amount, total, items)
      VALUES (
        ${value.clientName},
        ${value.notes},
        ${value.vatRate},
        ${value.subtotal},
        ${value.vat},
        ${value.total},
        ${JSON.stringify(value.items)}::jsonb
      )
      RETURNING id
    `;
    return Response.json({
      ok: true,
      id: String(rows[0].id),
      subtotal: value.subtotal,
      vat: value.vat,
      total: value.total,
      vatRate: value.vatRate,
    });
  } catch {
    return dbError();
  }
}
