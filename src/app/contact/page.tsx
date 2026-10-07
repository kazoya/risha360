import { LeadForm } from "@/components/lead-form";
import { WhatsAppQr } from "@/components/whatsapp-qr";
import {
  CONTACT_CITY,
  CONTACT_EMAIL,
  CONTACT_NAME,
  CONTACT_PHONE_DIGITS,
  CONTACT_PHONE_DISPLAY,
  DEFAULT_WA_TEXT,
  PORTFOLIO_URL,
  waUrl,
} from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل",
  description: "واتساب صهيب الصالح ونموذج حفظ الطلبات لمنصة ريشة 360.",
};

export default function ContactPage() {
  const url = waUrl(DEFAULT_WA_TEXT);
  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">تواصل</h1>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-muted">
          الجهة المعتمدة لهذه المنصة هي {CONTACT_NAME}. النموذج يحفظ الطلب فقط.
        </p>
        <ul className="mt-6 space-y-2 text-sm leading-7">
          <li>
            <a dir="ltr" className="inline-block" href={`tel:+${CONTACT_PHONE_DIGITS}`}>
              {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>{CONTACT_CITY}</li>
          <li>
            <a className="underline decoration-gold underline-offset-4" href={PORTFOLIO_URL}>
              المحفظة المنشورة
            </a>
          </li>
        </ul>
        <div className="mt-6">
          <WhatsAppQr url={url} label="افتح واتساب صهيب الصالح" />
        </div>
      </div>
      <LeadForm />
    </div>
  );
}
