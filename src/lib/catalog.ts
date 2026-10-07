export type ToolMode = "browser" | "request" | "review";

export type Tool = {
  slug: string;
  title: string;
  summary: string;
  group: "محتوى" | "صور" | "وثائق" | "تواصل";
  mode: ToolMode;
};

export const MODE_LABEL: Record<ToolMode, string> = {
  browser: "تعمل في المتصفح",
  request: "تُطلب عبر واتساب، بلا توليد آلي هنا",
  review: "مرجع فقط، بلا حساب آلي",
};

/**
 * Service menu adapted from public page titles on the local 3aqel.com mirror.
 * Live behavior exists only for mode "browser".
 */
export const TOOLS: Tool[] = [
  {
    slug: "ad-copy",
    title: "نص إعلان",
    summary: "ثلاث زوايا لنص عربي من وصف المنتج والجمهور. التنفيذ يُطلب، ولا يُكتب آلياً هنا.",
    group: "محتوى",
    mode: "request",
  },
  {
    slug: "ad-templates",
    title: "قوالب إعلان فيديو",
    summary: "اختيار قالب ثم كتابة النص. بناء الفيديو ليس مشغّلاً على هذه المنصة.",
    group: "محتوى",
    mode: "request",
  },
  {
    slug: "motion-graphic",
    title: "موشن جرافيك",
    summary: "وصف قصير وقالب حركة عربية. المقطع يُطلب ويُراجع قبل التسليم.",
    group: "محتوى",
    mode: "request",
  },
  {
    slug: "arabic-tts",
    title: "تعليق صوتي عربي",
    summary: "تحويل نص قصير إلى MP3 بصوت جاهز. التوليد غير موصول هنا.",
    group: "محتوى",
    mode: "request",
  },
  {
    slug: "ai-photos",
    title: "صور منتجات وشخصية",
    summary: "صور بجودة استوديو من وصف عربي. لا جلسة تصوير وهمية على الموقع.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "ai-photo-editor",
    title: "تعديل صورة بالوصف",
    summary: "تغيير خلفية أو إضاءة أو إزالة عنصر حسب وصف عربي.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "animate-image",
    title: "تحريك صورة",
    summary: "مقطع قصير من صورة منتج. التنزيل يتم بعد التنفيذ اليدوي.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "image-enhancer",
    title: "تحسين وتكبير",
    summary: "تكبير 2× أو 4× مع خيار تحسين الوجوه. غير موصول كخدمة توليد.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "image-resizer",
    title: "مقاسات المتاجر",
    summary: "تجهيز JPG وPNG وWebP لمقاسات النشر والمتجر.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "remove-background",
    title: "إزالة الخلفية",
    summary: "خلفية شفافة أو بيضاء لصورة شخصية أو منتج.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "white-background",
    title: "خلفية بيضاء للمنتج",
    summary: "توسيط المنتج مع هامش وظل خفيف لصفحات المتجر.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "logo-maker",
    title: "شعار",
    summary: "اتجاهان للاسم والمجال. الملفات تُسلّم بعد الموافقة، لا توليد فوري.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "text-on-image",
    title: "كتابة على الصورة",
    summary: "سعر أو شعار فوق صورة المنتج بخط عربي.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "merge-images",
    title: "دمج صور",
    summary: "شبكة أو صف من صورتين حتى تسع صور مع تسميات عربية.",
    group: "صور",
    mode: "request",
  },
  {
    slug: "catalog-maker",
    title: "كتالوج PDF",
    summary: "منتجات بالصور والسعر وSKU. يُجهّز كملف بعد المراجعة.",
    group: "وثائق",
    mode: "request",
  },
  {
    slug: "menu-maker",
    title: "قائمة مطعم",
    summary: "أقسام وأسعار على صفحات A4. التصميم يُطلب ولا يُرسم آلياً.",
    group: "وثائق",
    mode: "request",
  },
  {
    slug: "invoice",
    title: "فاتورة",
    summary: "فاتورة عربية مع ضريبة القيمة المضافة. المسودة هنا لا تُرسل لمصلحة الضرائب.",
    group: "وثائق",
    mode: "request",
  },
  {
    slug: "quotation",
    title: "عرض سعر",
    summary: "بنود وخصم وضريبة. المسودة تُحفظ في قاعدة البيانات ولا تُرسل وحدها.",
    group: "وثائق",
    mode: "browser",
  },
  {
    slug: "contracts",
    title: "نماذج عقود",
    summary: "عقد خدمات أو عدم إفصاح كنقطة بداية. ليست استشارة قانونية.",
    group: "وثائق",
    mode: "review",
  },
  {
    slug: "vat-calculator",
    title: "حاسبة الضريبة",
    summary: "إضافة الضريبة أو استخراجها بنسب الأردن والخليج ومصر المنشورة.",
    group: "وثائق",
    mode: "browser",
  },
  {
    slug: "feasibility-study",
    title: "نقطة التعادل",
    summary: "تكاليف ثابتة ومتغيرة وسعر البيع. رقم توضيحي، ليس دراسة جدوى معتمدة.",
    group: "وثائق",
    mode: "browser",
  },
  {
    slug: "end-of-service",
    title: "مكافأة نهاية الخدمة",
    summary: "تختلف بين الاستقالة والإنهاء وبين السعودية والإمارات. لا نحسبها آلياً هنا.",
    group: "وثائق",
    mode: "review",
  },
  {
    slug: "barcode",
    title: "رمز QR",
    summary: "رابط أو نص يتحول إلى رمز PNG داخل المتصفح. لا يغادر جهازك.",
    group: "تواصل",
    mode: "browser",
  },
  {
    slug: "whatsapp-link",
    title: "رابط واتساب",
    summary: "رقم ورسالة ترحيب ثم رابط wa.me ورمز للطباعة.",
    group: "تواصل",
    mode: "browser",
  },
  {
    slug: "instagram-management",
    title: "إدارة إنستقرام",
    summary: "محتوى ونشر لمتجر صغير. الخدمة اتفاق بشري، ليست جدولة آلية من هذا الموقع.",
    group: "تواصل",
    mode: "request",
  },
];

export const GROUPS = ["محتوى", "صور", "وثائق", "تواصل"] as const;

export function getTool(slug: string) {
  return TOOLS.find((tool) => tool.slug === slug);
}

export const SECTORS = [
  {
    slug: "real-estate",
    title: "العقارات",
    summary: "إعلان الوحدة، صورة الواجهة، ورابط واتساب على اللوحة.",
    tools: ["ad-copy", "ai-photos", "whatsapp-link"],
  },
  {
    slug: "restaurants",
    title: "المطاعم",
    summary: "قائمة أسعار، خلفية الطبق، وعرض سعر للتموين.",
    tools: ["menu-maker", "white-background", "quotation"],
  },
  {
    slug: "commerce",
    title: "المتاجر",
    summary: "كتالوج، مقاسات النشر، وفاتورة قبل الشحن.",
    tools: ["catalog-maker", "image-resizer", "invoice"],
  },
  {
    slug: "education",
    title: "التعليم",
    summary: "موشن قصير، تعليق صوتي، ونقطة تعادل للدورة.",
    tools: ["motion-graphic", "arabic-tts", "feasibility-study"],
  },
  {
    slug: "marketing",
    title: "التسويق",
    summary: "قالب إعلان، شعار، ورمز QR للحملة.",
    tools: ["ad-templates", "logo-maker", "barcode"],
  },
] as const;
