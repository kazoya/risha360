"use client";

import { BOTTLENECKS } from "@/lib/calc";
import { SECTORS } from "@/lib/catalog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AssessmentForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [sector, setSector] = useState<string>(SECTORS[0].slug);
  const [weeklyPosts, setWeeklyPosts] = useState("3");
  const [bottleneck, setBottleneck] = useState<string>(BOTTLENECKS[0].id);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          businessName,
          sector,
          weeklyPosts: Number(weeklyPosts),
          bottleneck,
        }),
      });
      const data = (await response.json()) as { ok: boolean; id?: string; error?: string };
      if (!response.ok || !data.ok || !data.id) {
        setError(data.error ?? "تعذر الحفظ.");
        return;
      }
      router.push(`/assessment/${data.id}`);
    } catch {
      setError("تعذر الاتصال.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <label className="grid gap-2 text-sm">
        <span>اسم النشاط</span>
        <input
          className="h-12 rounded-xl border border-line bg-card px-3"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>المجال</span>
        <select
          className="h-12 rounded-xl border border-line bg-card px-3"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
        >
          {SECTORS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span>منشورات الأسبوع</span>
        <input
          inputMode="numeric"
          className="h-12 rounded-xl border border-line bg-card px-3"
          value={weeklyPosts}
          onChange={(event) => setWeeklyPosts(event.target.value)}
        />
        <span className="text-muted">رقم من 0 إلى 70. التقدير أولي وليس تدقيقاً.</span>
      </label>
      <fieldset className="grid gap-2">
        <legend className="text-sm">أين يتعطل العمل؟</legend>
        {BOTTLENECKS.map((item) => (
          <label key={item.id} className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3">
            <input
              type="radio"
              name="bottleneck"
              checked={bottleneck === item.id}
              onChange={() => setBottleneck(item.id)}
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-forest px-5 text-paper disabled:opacity-60"
      >
        {pending ? "جار الحفظ" : "احفظ التقدير"}
      </button>
    </form>
  );
}
