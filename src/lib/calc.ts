export const VAT_RATES = [
  { code: "JO", label: "الأردن", rate: 16 },
  { code: "SA", label: "السعودية", rate: 15 },
  { code: "AE", label: "الإمارات", rate: 5 },
  { code: "BH", label: "البحرين", rate: 10 },
  { code: "OM", label: "عُمان", rate: 5 },
  { code: "EG", label: "مصر", rate: 14 },
] as const;

export type VatCode = (typeof VAT_RATES)[number]["code"];

export function round2(value: number) {
  return Math.round(value * 100) / 100;
}

export function quoteTotals(
  items: { qty: number; price: number }[],
  rate: number,
) {
  const subtotal = round2(
    items.reduce((sum, item) => sum + item.qty * item.price, 0),
  );
  const vat = round2((subtotal * rate) / 100);
  const total = round2(subtotal + vat);
  return { subtotal, vat, total };
}

export function breakEven(fixed: number, price: number, variable: number) {
  const margin = price - variable;
  if (!(margin > 0) || !(fixed >= 0)) return null;
  return fixed / margin;
}

export const BOTTLENECKS = [
  { id: "content", label: "المحتوى والإعلان" },
  { id: "design", label: "صور المنتجات" },
  { id: "documents", label: "الفواتير والعروض" },
  { id: "followup", label: "متابعة الواتساب" },
] as const;

export type BottleneckId = (typeof BOTTLENECKS)[number]["id"];

export function assessmentScore(weeklyPosts: number, bottleneck: BottleneckId) {
  const postWeight = Math.min(weeklyPosts, 14) * 4;
  const bottleneckWeight =
    bottleneck === "followup" ? 18 : bottleneck === "documents" ? 14 : 11;
  return Math.min(96, 23 + postWeight + bottleneckWeight);
}

export function assessmentAdvice(bottleneck: BottleneckId) {
  switch (bottleneck) {
    case "content":
      return "ابدأ بثلاث زوايا إعلان قصيرة هذا الأسبوع، ثم اطلب التنفيذ عبر واتساب. لا توليد آلي للنصوص على هذه المنصة.";
    case "design":
      return "جهّز مقاس المتجر وخلفية المنتج قبل أي حملة. طلب الصور يُراجع يدوياً ولا يُولَّد هنا.";
    case "documents":
      return "احفظ عرض سعر واحد من الاستوديو قبل أول عميل. الحفظ لا يرسل الفاتورة إلى أحد.";
    case "followup":
      return "اصنع رابط واتساب ورمز QR من الاستوديو، وضعه على عرض السعر. الإرسال يبقى بيدك.";
  }
}
