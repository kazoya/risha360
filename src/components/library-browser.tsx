"use client";

import { waUrl } from "@/lib/config";
import type { OssItem } from "@/lib/oss";
import { useMemo, useState } from "react";

const KINDS = [
  { id: "skills", label: "مهارات" },
  { id: "agents", label: "وكلاء" },
] as const;

export function LibraryBrowser({
  skills,
  agents,
}: {
  skills: OssItem[];
  agents: OssItem[];
}) {
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("skills");
  const [group, setGroup] = useState("الكل");
  const [query, setQuery] = useState("");

  const source = kind === "skills" ? skills : agents;
  const groups = useMemo(() => ["الكل", ...new Set(source.map((item) => item.group))], [source]);

  const visible = source.filter((item) => {
    const inGroup = group === "الكل" || item.group === group;
    const haystack = `${item.title} ${item.summary}`.toLowerCase();
    return inGroup && haystack.includes(query.trim().toLowerCase());
  });

  function pickKind(next: (typeof KINDS)[number]["id"]) {
    setKind(next);
    setGroup("الكل");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {KINDS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => pickKind(item.id)}
            className={`h-11 rounded-full px-4 text-sm ${kind === item.id ? "bg-forest text-paper" : "border border-line"}`}
          >
            {item.label}
          </button>
        ))}
        <label className="ms-auto min-w-48 flex-1 text-sm">
          <span className="sr-only">بحث في العناوين</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث بالعنوان الإنجليزي"
            className="h-11 w-full rounded-full border border-line bg-card px-4"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {groups.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setGroup(name)}
            className={`h-9 rounded-full px-3 text-sm ${group === name ? "bg-[#e7f0ea] text-[#14241c] dark:bg-[#1a2e26] dark:text-paper" : "text-muted"}`}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">الظاهر الآن: {visible.length}</p>
      <ul className="mt-2 divide-y divide-line border-y border-line">
        {visible.map((item) => (
          <li key={item.slug} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-semibold" dir="ltr">
                {item.title}
              </h3>
              <span className="text-sm text-muted">{item.group}</span>
            </div>
            <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted" dir="ltr">
              {item.summary}
            </p>
            <p className="mt-3 flex flex-wrap gap-4 text-sm">
              <a
                href={item.href}
                className="underline decoration-gold underline-offset-4"
                rel="noreferrer"
                target="_blank"
              >
                ملف المصدر
              </a>
              <a
                href={waUrl(`مرحباً، أريد مناقشة مرجع ${item.title} من المكتبة المفتوحة في ريشة 360.`)}
                className="underline decoration-gold underline-offset-4"
              >
                اطلب مناقشة
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
