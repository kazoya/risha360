"use client";

import { TOOLS } from "@/lib/catalog";
import { useState } from "react";

const empty = { name: "", phone: "", company: "", interest: "", message: "" };

export function LeadForm() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setId("");
    setPending(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok: boolean; id?: string; error?: string };
      if (!response.ok || !data.ok || !data.id) {
        setError(data.error ?? "تعذر الحفظ.");
        return;
      }
      setId(data.id);
      setForm(empty);
    } catch {
      setError("تعذر الاتصال. أعد المحاولة.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <Field label="الاسم" value={form.name} onChange={(name) => setForm({ ...form, name })} />
      <Field
        label="الجوال"
        value={form.phone}
        hint="أرقام فقط مع مفتاح الدولة، مثل 962787523192"
        onChange={(phone) => setForm({ ...form, phone })}
      />
      <Field
        label="النشاط"
        value={form.company}
        optional
        onChange={(company) => setForm({ ...form, company })}
      />
      <label className="grid gap-2 text-sm">
        <span>الاهتمام</span>
        <select
          className="h-12 rounded-xl border border-line bg-card px-3"
          value={form.interest}
          onChange={(event) => setForm({ ...form, interest: event.target.value })}
        >
          <option value="">عام</option>
          {TOOLS.map((tool) => (
            <option key={tool.slug} value={tool.slug}>
              {tool.title}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span>الرسالة</span>
        <textarea
          className="min-h-28 rounded-xl border border-line bg-card px-3 py-3"
          value={form.message}
          maxLength={1000}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
        <span className="text-muted">الحفظ لا يرسل واتساب ولا بريداً. المتابعة يدوية.</span>
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {id ? (
        <p className="text-sm">
          حُفظ الطلب. المرجع <span className="font-medium">{id.slice(0, 8)}</span>
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-forest px-5 text-paper disabled:opacity-60"
      >
        {pending ? "جار الحفظ" : "احفظ الطلب"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  optional?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>
        {label}
        {optional ? <span className="text-muted"> (اختياري)</span> : null}
      </span>
      <input
        className="h-12 rounded-xl border border-line bg-card px-3"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <span className="text-muted">{hint}</span> : null}
    </label>
  );
}
