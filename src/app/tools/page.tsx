import { GROUPS, MODE_LABEL, TOOLS } from "@/lib/catalog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأدوات",
  description: "كتالوج أدوات التسويق في ريشة 360، مع تمييز ما يعمل في المتصفح وما يُطلب يدوياً.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">أدوات الكتالوج</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        كل بطاقة من صفحة عامة. الشارة تقول إن كانت الأداة تعمل هنا أو تُطلب للمراجعة.
      </p>
      <div className="mt-10 grid gap-12">
        {GROUPS.map((group) => (
          <section key={group}>
            <h2 className="text-2xl font-semibold">{group}</h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {TOOLS.filter((tool) => tool.group === group).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={`block h-full rounded-3xl p-5 ${tool.mode === "browser" ? "bg-forest text-paper" : "border border-line bg-card"}`}
                  >
                    <span className={`text-sm ${tool.mode === "browser" ? "text-[#d7e4dc]" : "text-muted"}`}>
                      {MODE_LABEL[tool.mode]}
                    </span>
                    <span className="mt-2 block text-xl font-semibold">{tool.title}</span>
                    <span className={`mt-2 block text-sm leading-relaxed ${tool.mode === "browser" ? "text-[#d7e4dc]" : "text-muted"}`}>
                      {tool.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
