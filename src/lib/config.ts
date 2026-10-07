/** Approved contact for this concept site. Digits only inside wa.me. */
export const CONTACT_NAME = "صهيب الصالح";
export const CONTACT_PHONE_DISPLAY = "+962 78 752 3192";
export const CONTACT_PHONE_DIGITS = "962787523192";
export const CONTACT_EMAIL = "Suhib.Asrawi@gmail.com";
export const CONTACT_CITY = "عمّان، الأردن";
export const PORTFOLIO_URL = "https://suhib-ai-delivery-portfolio.vercel.app/";

export function waUrl(text: string) {
  return `https://wa.me/${CONTACT_PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

export const DEFAULT_WA_TEXT =
  "مرحباً، أريد مناقشة منصة ريشة 360 التسويقية.";
