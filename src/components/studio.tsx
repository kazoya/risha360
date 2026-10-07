"use client";

import { VAT_RATES, breakEven, round2 } from "@/lib/calc";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState } from "react";

const TABS = [
  { id: "whatsapp", label: "واتساب" },
  { id: "qr", label: "رمز QR" },
  { id: "vat", label: "الضريبة" },
  { id: "quote", label: "عرض سعر" },
  { id: "even", label: "التعادل" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Studio() {
  const [tab, setTab] = useState<TabId>("whatsapp");
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`h-11 shrink-0 rounded-full px-4 text-sm ${tab === item.id ? "bg-forest text-paper" : "border border-line bg-card"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === "whatsapp" ? <WhatsAppTool /> : null}
        {tab === "qr" ? <QrTool /> : null}
        {tab === "vat" ? <VatTool /> : null}
        {tab === "quote" ? <QuoteTool /> : null}
        {tab === "even" ? <EvenTool /> : null}
      </div>
    </div>
  );
}

function WhatsAppTool() {
  const [phone, setPhone] = useState("962");
  const [text, setText] = useState("مرحباً، أريد الاستفسار عن المنتج.");
  const digits = phone.replace(/[^\d]/g, "");
  const url = digits.length >= 8 ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : "";
  return (
    <ToolFrame title="رابط واتساب لرقمك" note="الرابط يُبنى في المتصفح. لا نرسل الرسالة نيابة عنك.">
      <label className="grid gap-2 text-sm">
        <span>الرقم مع مفتاح الدولة</span>
        <input className="h-12 rounded-xl border border-line bg-card px-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label className="grid gap-2 text-sm">
        <span>الرسالة الجاهزة</span>
        <textarea className="min-h-24 rounded-xl border border-line bg-card px-3 py-3" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      {url ? (
        <div className="flex flex-wrap items-center gap-4">
          <a className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper" href={url} target="_blank" rel="noopener noreferrer">
            افتح الرابط
          </a>
          <span className="rounded-md bg-white p-2">
            <QRCodeSVG value={url} size={112} level="M" marginSize={4} />
          </span>
        </div>
      ) : (
        <p className="text-sm text-danger">أدخل 8 أرقام على الأقل.</p>
      )}
    </ToolFrame>
  );
}

function QrTool() {
  const [value, setValue] = useState("https://");
  const usable = value.trim().length > 2;
  return (
    <ToolFrame title="رمز لأي نص أو رابط" note="الرمز يُرسم محلياً ولا يُرفع.">
      <label className="grid gap-2 text-sm">
        <span>النص</span>
        <textarea className="min-h-24 rounded-xl border border-line bg-card px-3 py-3" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      {usable ? (
        <span className="inline-block rounded-md bg-white p-2">
          <QRCodeSVG value={value.trim()} size={160} level="M" marginSize={4} />
        </span>
      ) : null}
    </ToolFrame>
  );
}

function VatTool() {
  const [amount, setAmount] = useState("100");
  const [code, setCode] = useState<(typeof VAT_RATES)[number]["code"]>("JO");
  const [mode, setMode] = useState<"add" | "extract">("add");
  const rate = VAT_RATES.find((row) => row.code === code)?.rate ?? 16;
  const value = Number(amount);
  const result = useMemo(() => {
    if (!Number.isFinite(value) || value < 0) return null;
    if (mode === "add") {
      const vat = round2((value * rate) / 100);
      return { base: round2(value), vat, total: round2(value + vat) };
    }
    const base = round2(value / (1 + rate / 100));
    return { base, vat: round2(value - base), total: round2(value) };
  }, [mode, rate, value]);
  return (
    <ToolFrame title="ضريبة القيمة المضافة" note="النسب شائعة ومنشورة. راجع التشريع قبل الاعتماد.">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          <span>المبلغ</span>
          <input className="h-12 rounded-xl border border-line bg-card px-3" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm">
          <span>البلد</span>
          <select className="h-12 rounded-xl border border-line bg-card px-3" value={code} onChange={(e) => setCode(e.target.value as typeof code)}>
            {VAT_RATES.map((row) => (
              <option key={row.code} value={row.code}>
                {row.label} {row.rate}%
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span>العملية</span>
          <select className="h-12 rounded-xl border border-line bg-card px-3" value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
            <option value="add">أضف الضريبة</option>
            <option value="extract">استخرجها من مبلغ شامل</option>
          </select>
        </label>
      </div>
      {result ? (
        <p className="text-lg">
          الأساس {result.base}، الضريبة {result.vat}، الإجمالي {result.total}
        </p>
      ) : (
        <p className="text-sm text-danger">أدخل مبلغاً صالحاً.</p>
      )}
    </ToolFrame>
  );
}

function QuoteTool() {
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [vatCode, setVatCode] = useState("JO");
  const [items, setItems] = useState([{ name: "", qty: "1", price: "" }]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<{ id: string; subtotal: number; vat: number; total: number; vatRate: number } | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    setSaved(null);
    try {
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          clientName,
          notes,
          vatCode,
          items: items.map((item) => ({ name: item.name, qty: Number(item.qty), price: Number(item.price) })),
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        id?: string;
        subtotal?: number;
        vat?: number;
        total?: number;
        vatRate?: number;
      };
      if (!response.ok || !data.ok || !data.id) {
        setError(data.error ?? "تعذر الحفظ.");
        return;
      }
      setSaved({
        id: data.id,
        subtotal: Number(data.subtotal),
        vat: Number(data.vat),
        total: Number(data.total),
        vatRate: Number(data.vatRate),
      });
    } catch {
      setError("تعذر الاتصال.");
    } finally {
      setPending(false);
    }
  }

  return (
    <ToolFrame title="مسودة عرض سعر" note="تُحفظ في قاعدة البيانات. لا تُرسل إلى العميل تلقائياً.">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm">
          <span>اسم العميل</span>
          <input className="h-12 rounded-xl border border-line bg-card px-3" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </label>
          <p className="text-sm text-muted">كل سطر: اسم البند، ثم الكمية، ثم السعر.</p>
        {items.map((item, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-[1.4fr_0.6fr_0.8fr]">
            <input
              aria-label="اسم البند"
              className="h-12 rounded-xl border border-line bg-card px-3"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, name: e.target.value };
                setItems(next);
              }}
            />
            <input
              aria-label="الكمية"
              className="h-12 rounded-xl border border-line bg-card px-3"
              value={item.qty}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, qty: e.target.value };
                setItems(next);
              }}
            />
            <input
              aria-label="السعر"
              className="h-12 rounded-xl border border-line bg-card px-3"
              value={item.price}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, price: e.target.value };
                setItems(next);
              }}
            />
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="h-11 rounded-full border border-line px-4"
            onClick={() => setItems([...items, { name: "", qty: "1", price: "" }])}
          >
            بند آخر
          </button>
          <label className="flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm">
            الضريبة
            <select value={vatCode} onChange={(e) => setVatCode(e.target.value)} className="bg-transparent">
              {VAT_RATES.map((row) => (
                <option key={row.code} value={row.code}>
                  {row.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span>ملاحظة</span>
          <input className="h-12 rounded-xl border border-line bg-card px-3" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <button type="submit" disabled={pending} className="h-12 rounded-full bg-forest px-5 text-paper disabled:opacity-60">
          {pending ? "جار الحفظ" : "احفظ المسودة"}
        </button>
      </form>
      {saved ? (
        <div className="rounded-2xl bg-forest p-5 text-paper">
          <p className="text-sm">مرجع {saved.id.slice(0, 8)}</p>
          <p className="mt-2 text-2xl font-semibold">{saved.total}</p>
          <p className="mt-1 text-sm">
            الأساس {saved.subtotal} والضريبة {saved.vatRate}% = {saved.vat}
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}

function EvenTool() {
  const [fixed, setFixed] = useState("2000");
  const [price, setPrice] = useState("25");
  const [variable, setVariable] = useState("9");
  const units = breakEven(Number(fixed), Number(price), Number(variable));
  return (
    <ToolFrame title="نقطة التعادل" note="رقم توضيحي. لا يشمل تمويلاً ولا ضريبة ولا موسماً.">
      <div className="grid gap-4 md:grid-cols-3">
        <Num label="تكاليف ثابتة" value={fixed} onChange={setFixed} />
        <Num label="سعر البيع" value={price} onChange={setPrice} />
        <Num label="تكلفة الوحدة" value={variable} onChange={setVariable} />
      </div>
      {units === null ? (
        <p className="text-sm text-danger">سعر البيع يجب أن يبقى أعلى من تكلفة الوحدة.</p>
      ) : (
        <p className="text-lg leading-relaxed">
          الأساس {round2(units)} وحدة. الأهدأ {round2(units * 0.7)}. الأنشط {round2(units * 1.3)}.
        </p>
      )}
    </ToolFrame>
  );
}

function Num({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm">
      <span>{label}</span>
      <input className="h-12 rounded-xl border border-line bg-card px-3" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ToolFrame({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 rounded-3xl border border-line bg-paper p-5 sm:p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}
