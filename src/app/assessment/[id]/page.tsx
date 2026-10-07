import { BOTTLENECKS } from "@/lib/calc";
import { SECTORS } from "@/lib/catalog";
import { waUrl } from "@/lib/config";
import { requireSql } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

type Params = { id: string };

export const metadata: Metadata = {
  title: "نتيجة التقدير",
};

export default function AssessmentResultPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<p className="px-4 py-12 text-sm text-muted">جار تحميل التقدير</p>}>
      <AssessmentResult params={params} />
    </Suspense>
  );
}

async function AssessmentResult({ params }: { params: Promise<Params> }) {
  await connection();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const sql = requireSql();
  const rows = await sql`
    SELECT business_name, sector, weekly_posts, bottleneck, score, recommendation, created_at
    FROM assessments
    WHERE id = ${id}
    LIMIT 1
  `;
  const row = rows[0];
  if (!row) notFound();
  const sector = SECTORS.find((item) => item.slug === row.sector)?.title ?? String(row.sector);
  const bottleneck = BOTTLENECKS.find((item) => item.id === row.bottleneck)?.label ?? String(row.bottleneck);
  const followUp = waUrl(
    `مرحباً، هذا تقدير ريشة 360 للنشاط ${row.business_name}. المرجع ${id.slice(0, 8)}. أريد مناقشته.`,
  );
  return (
    <article className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <p className="text-sm text-muted">تقدير أولي محفوظ. ليس تدقيقاً ولا حملة مرسلة.</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{String(row.business_name)}</h1>
      <p className="mt-6 text-7xl font-semibold leading-none text-forest">{String(row.score)}</p>
      <p className="mt-4 leading-relaxed">{String(row.recommendation)}</p>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">المجال</dt>
          <dd>{sector}</dd>
        </div>
        <div>
          <dt className="text-muted">المنشورات</dt>
          <dd>{String(row.weekly_posts)}</dd>
        </div>
        <div>
          <dt className="text-muted">التعطل</dt>
          <dd>{bottleneck}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={followUp} className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper">
          ناقش النتيجة على واتساب
        </a>
        <Link href="/studio" className="inline-flex h-12 items-center rounded-full border border-line px-5">
          الاستوديو
        </Link>
      </div>
    </article>
  );
}
