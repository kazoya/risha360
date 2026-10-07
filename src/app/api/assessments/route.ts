import { dbError, fail, parseAssessment, readJson } from "@/lib/http";
import { requireSql } from "@/lib/db";

export async function POST(request: Request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return fail(parsed.error);
  const assessment = parseAssessment(parsed.body);
  if (!assessment.ok) return fail(assessment.error);
  const value = assessment.value;
  try {
    const sql = requireSql();
    const rows = await sql`
      INSERT INTO assessments (business_name, sector, weekly_posts, bottleneck, score, recommendation)
      VALUES (
        ${value.businessName},
        ${value.sector},
        ${value.weeklyPosts},
        ${value.bottleneck},
        ${value.score},
        ${value.recommendation}
      )
      RETURNING id
    `;
    return Response.json({ ok: true, id: String(rows[0].id), score: value.score });
  } catch {
    return dbError();
  }
}
