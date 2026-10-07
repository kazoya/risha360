import { NextResponse } from "next/server";
import {
  BOTTLENECKS,
  type BottleneckId,
  VAT_RATES,
  assessmentAdvice,
  assessmentScore,
  quoteTotals,
  type VatCode,
} from "@/lib/calc";
import { SECTORS } from "@/lib/catalog";
import { requireSql } from "@/lib/db";

export async function readJson(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 40_000) {
    return { ok: false as const, error: "الطلب أكبر من الحد." };
  }
  try {
    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object") {
      return { ok: false as const, error: "صيغة غير مفهومة." };
    }
    return { ok: true as const, body: body as Record<string, unknown> };
  } catch {
    return { ok: false as const, error: "صيغة غير مفهومة." };
  }
}

export function textField(value: unknown, min: number, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

export function phoneField(value: unknown) {
  if (typeof value !== "string") return null;
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

export function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export function dbError() {
  return NextResponse.json(
    { ok: false, error: "تعذر الحفظ. أعد المحاولة أو راسل واتساب." },
    { status: 503 },
  );
}

const sectorIds = new Set(SECTORS.map((sector) => sector.slug));
const bottleneckIds = new Set(BOTTLENECKS.map((item) => item.id));

export function parseAssessment(body: Record<string, unknown>) {
  const businessName = textField(body.businessName, 2, 80);
  const sector = textField(body.sector, 2, 40);
  const bottleneck = textField(body.bottleneck, 2, 20);
  const weekly = Number(body.weeklyPosts);
  if (!businessName || !sector || !sectorIds.has(sector as (typeof SECTORS)[number]["slug"])) {
    return { ok: false as const, error: "أكمل اسم النشاط والمجال." };
  }
  if (!bottleneck || !bottleneckIds.has(bottleneck as BottleneckId)) {
    return { ok: false as const, error: "اختر عنق الزجاجة." };
  }
  if (!Number.isInteger(weekly) || weekly < 0 || weekly > 70) {
    return { ok: false as const, error: "عدد المنشورات بين 0 و 70." };
  }
  const kind = bottleneck as BottleneckId;
  return {
    ok: true as const,
    value: {
      businessName,
      sector,
      bottleneck: kind,
      weeklyPosts: weekly,
      score: assessmentScore(weekly, kind),
      recommendation: assessmentAdvice(kind),
    },
  };
}

export type QuoteItem = { name: string; qty: number; price: number };

export function parseQuote(body: Record<string, unknown>) {
  const clientName = textField(body.clientName, 2, 80);
  const notes = textField(body.notes, 0, 400) ?? "";
  const rateCode = textField(body.vatCode, 2, 2);
  const rateRow = VAT_RATES.find((row) => row.code === rateCode);
  if (!clientName || !rateRow) {
    return { ok: false as const, error: "اسم العميل ونسبة الضريبة مطلوبان." };
  }
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 12) {
    return { ok: false as const, error: "أضف بنداً واحداً حتى 12." };
  }
  const items: QuoteItem[] = [];
  for (const raw of body.items) {
    if (!raw || typeof raw !== "object") {
      return { ok: false as const, error: "بند غير مفهوم." };
    }
    const row = raw as Record<string, unknown>;
    const name = textField(row.name, 1, 80);
    const qty = Number(row.qty);
    const price = Number(row.price);
    if (!name || !Number.isFinite(qty) || qty <= 0 || qty > 100000) {
      return { ok: false as const, error: "راجع الكمية واسم البند." };
    }
    if (!Number.isFinite(price) || price < 0 || price > 1_000_000) {
      return { ok: false as const, error: "راجع سعر البند." };
    }
    items.push({ name, qty, price });
  }
  const totals = quoteTotals(items, rateRow.rate);
  return {
    ok: true as const,
    value: {
      clientName,
      notes,
      vatCode: rateRow.code as VatCode,
      vatRate: rateRow.rate,
      items,
      ...totals,
    },
  };
}

export async function insertLead(input: {
  name: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
}) {
  const sql = requireSql();
  const rows = await sql`
    INSERT INTO leads (name, phone, company, interest, message)
    VALUES (${input.name}, ${input.phone}, ${input.company}, ${input.interest}, ${input.message})
    RETURNING id
  `;
  return String(rows[0].id);
}
