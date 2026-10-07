export type Project = {
  title: string;
  status: "حيّ" | "تجريبي" | "نموذج أولي";
  problem: string;
  result: string;
  evidence: string;
  href?: string;
  hrefLabel?: string;
  caseHref: string;
};

/** Facts copied from the public portfolio the owner asked to show. No extra clients. */
export const PROJECTS: Project[] = [
  {
    title: "ريشة 360: أدوار المشاهير",
    status: "حيّ",
    problem:
      "منصة مواهب تحتاج دخولاً ذاتياً للمشاهير وتعديلاً مقيّداً لملفاتهم، ثم عروض واتفاقيات وصرف.",
    result:
      "أدوار الدخول الذاتي في الإنتاج على Laravel Forge. مركز التعاون جاهز للدمج باختباراته.",
    evidence: "إنتاج لعميل وPR وترحيل. لا رابط عام للمنصة.",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects/risha360",
  },
  {
    title: "المثالية للألبان",
    status: "حيّ",
    problem: "مصنع أردني بلا حضور رقمي مقنع، ومطلوب موقع عرض قابل للنشر.",
    result: "موقع حي على Vercel من GitHub.",
    evidence: "رابط حي.",
    href: "https://al-mithaliya-dairy.vercel.app",
    hrefLabel: "الموقع الحي",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects/factories",
  },
  {
    title: "ACI للكيماويات الزراعية",
    status: "حيّ",
    problem: "مصنع يحتاج صفحة مبيعات وواتساب وحاسبة عائد للعرض.",
    result: "موقع حي على Vercel من GitHub.",
    evidence: "رابط حي ومستودع kazoya/ACI.",
    href: "https://aci-agrochemicals.vercel.app",
    hrefLabel: "الموقع الحي",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects/factories",
  },
  {
    title: "براءة الشوبكي",
    status: "تجريبي",
    problem:
      "عرض لمنتجات زيوت وخل ومستخلصات قبل اكتمال الصور والشعار والأسعار.",
    result:
      "ديمو حي بفحوص typecheck وunit وlint وbuild، وتمريرا مراجعة أمنية. SEO محجوب حتى الاعتماد.",
    evidence: "رابط حي ومراجعتان.",
    href: "https://baraahalshobaki.vercel.app",
    hrefLabel: "الديمو",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects/baraah",
  },
  {
    title: "أكاديمية APCA للذكاء الصناعي",
    status: "تجريبي",
    problem:
      "مؤسسات التدريب المهني تحتاج مُظهِراً لمهارات وسلامة الذكاء الاصطناعي الصناعي.",
    result: "مُظهِر حي بـ 11 اختباراً أخضر. ليس اعتماداً ولا شراكة مع GIZ.",
    evidence: "رابط حي وGitHub واختبارات.",
    href: "https://apca-industrial-ai-academy.vercel.app",
    hrefLabel: "المُظهِر",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects/giz-apca",
  },
  {
    title: "وثيقة",
    status: "نموذج أولي",
    problem: "قراءة ملفات PDF طويلة بالعربية عبر وكيل يجيب من الملف نفسه.",
    result: "منتج منشور للاستخدام المجاني. مسار الاشتراك غير موثّق حياً.",
    evidence: "رابط حي.",
    href: "https://wathiqa-eight.vercel.app",
    hrefLabel: "الموقع",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects",
  },
  {
    title: "غياري",
    status: "نموذج أولي",
    problem: "شراء قطع غيار في بيروت بلا شفافية لسعر التوصيل الكلي.",
    result: "شريحة منشورة على Vercel بقواعد صدق مكتوبة، بالعربية والإنجليزية والفرنسية.",
    evidence: "رابط حي وسكربتات فحص.",
    href: "https://ghayari.vercel.app",
    hrefLabel: "الموقع",
    caseHref: "https://suhib-ai-delivery-portfolio.vercel.app/projects",
  },
];
