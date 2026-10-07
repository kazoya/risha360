import Link from "next/link";
import { CONTACT_CITY, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DIGITS } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-[65ch]">
          <p className="text-lg font-semibold">ريشة 360</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            تصور تسويقي مستقل للنقاش. ليس النظام الرسمي لمنصة عقل، ولا يشغّل أدواتها المدفوعة.
            كتالوج الخدمات مبني على الصفحات العامة في مرآة 3aqel.com. التنفيذ الحي هنا: الحاسبات،
            رمز واتساب، وحفظ الطلبات في PostgreSQL. لا إرسال تلقائي.
          </p>
        </div>
        <div className="text-sm leading-7">
          <p>
            <a dir="ltr" className="inline-block" href={`tel:+${CONTACT_PHONE_DIGITS}`}>
              {CONTACT_PHONE_DISPLAY}
            </a>
          </p>
          <p>{CONTACT_CITY}</p>
          <p className="mt-3">
            <Link href="/contact" className="underline decoration-gold underline-offset-4">
              صفحة التواصل
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
