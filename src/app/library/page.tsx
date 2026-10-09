import { LibraryBrowser } from "@/components/library-browser";
import { OSS_AGENTS, OSS_SKILLS, OSS_SOURCES } from "@/lib/oss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المكتبة المفتوحة",
  description: "فهرس مراجع MIT للتسويق من marketingskills وagency-agents، مع رابط OpenResearch. ليست أدوات تعمل داخل ريشة 360.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">مكتبة مفتوحة</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        فهرس من ثلاث مستودعات برخصة MIT نُسخت محلياً للمراجعة. البطاقات لا تشغّل المهارة ولا الوكيل.
        طلب واتساب يفتح محادثة يدوية فقط.
      </p>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {OSS_SOURCES.map((source) => (
          <div key={source.name} className="grid gap-2 py-4 md:grid-cols-[12rem_1fr]">
            <dt className="font-semibold" dir="ltr">
              {source.name}
            </dt>
            <dd className="text-sm leading-relaxed text-muted">
              <span dir="ltr" className="inline-block">
                {source.license}, {source.commit}
              </span>
              {". "}
              {source.owner}
              {". "}
              {source.note}{" "}
              <a href={source.href} className="underline decoration-gold underline-offset-4" rel="noreferrer" target="_blank">
                المستودع
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <LibraryBrowser skills={OSS_SKILLS} agents={OSS_AGENTS} />
      </div>
    </div>
  );
}
