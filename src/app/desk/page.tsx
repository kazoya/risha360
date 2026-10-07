import { DeskLock } from "@/components/desk-lock";
import { deskUnlocked } from "@/lib/desk-action";
import { requireSql } from "@/lib/db";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "لوحة المالك",
  robots: { index: false, follow: false },
};

function when(value: unknown) {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar-JO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Amman",
  }).format(date);
}

export default function DeskPage() {
  return (
    <Suspense fallback={<p className="px-4 py-12 text-sm text-muted">جار فتح اللوحة</p>}>
      <DeskBody />
    </Suspense>
  );
}

async function DeskBody() {
  await connection();
  const open = await deskUnlocked();
  if (!open) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-semibold">لوحة المالك</h1>
        <p className="mt-3 text-sm text-muted">المفتاح في ملف البيئة المحلي باسم DESK_TOKEN. لا يُوضع في الرابط.</p>
        <DeskLock />
      </div>
    );
  }

  const sql = requireSql();
  const leads = await sql`
    SELECT id, name, phone, company, interest, message, status, created_at
    FROM leads ORDER BY created_at DESC LIMIT 12
  `;
  const assessments = await sql`
    SELECT id, business_name, score, bottleneck, created_at
    FROM assessments ORDER BY created_at DESC LIMIT 12
  `;
  const quotations = await sql`
    SELECT id, client_name, total, vat_rate, created_at
    FROM quotations ORDER BY created_at DESC LIMIT 12
  `;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold">الطلبات المحفوظة</h1>
      <p className="mt-2 text-sm text-muted">الحالة تبقى جديدة حتى تتابعها أنت. لا إرسال من هذه اللوحة.</p>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">الرسائل</h2>
        <div className="mt-4 grid gap-3">
          {leads.length === 0 ? <p className="text-sm text-muted">لا رسائل بعد.</p> : null}
          {leads.map((row) => (
            <article key={String(row.id)} className="rounded-2xl bg-card p-4">
              <p className="font-medium">
                {String(row.name)}، {String(row.phone)}
              </p>
              <p className="text-sm text-muted">
                {String(row.company || "بلا نشاط")}، {String(row.interest || "عام")}، {String(row.status)}
              </p>
              <p className="mt-2 text-sm">{String(row.message || "")}</p>
              <p className="mt-2 text-xs text-muted">{when(row.created_at)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">التقديرات</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {assessments.length === 0 ? <p className="text-sm text-muted">لا تقديرات بعد.</p> : null}
          {assessments.map((row) => (
            <article key={String(row.id)} className="rounded-2xl border border-line p-4">
              <p className="font-medium">{String(row.business_name)}</p>
              <p className="text-sm text-muted">
                الدرجة {String(row.score)}، {String(row.bottleneck)}
              </p>
              <p className="mt-2 text-xs text-muted">{when(row.created_at)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">عروض السعر</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {quotations.length === 0 ? <p className="text-sm text-muted">لا مسودات بعد.</p> : null}
          {quotations.map((row) => (
            <article key={String(row.id)} className="rounded-2xl bg-forest p-4 text-paper">
              <p className="font-medium">{String(row.client_name)}</p>
              <p className="text-2xl">{String(row.total)}</p>
              <p className="text-sm text-[#d7e4dc]">ضريبة {String(row.vat_rate)}%</p>
              <p className="mt-2 text-xs text-[#d7e4dc]">{when(row.created_at)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
