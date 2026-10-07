import { getSql } from "@/lib/db";

export async function GET() {
  const sql = getSql();
  if (!sql) {
    return Response.json({ ok: false, error: "DATABASE_URL missing" }, { status: 503 });
  }
  try {
    const rows = await sql`select now() as now, (select count(*)::int from leads) as leads`;
    return Response.json({ ok: true, now: rows[0].now, leads: rows[0].leads });
  } catch {
    return Response.json({ ok: false, error: "database unreachable" }, { status: 503 });
  }
}
