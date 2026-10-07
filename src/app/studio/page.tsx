import { Studio } from "@/components/studio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الاستوديو",
  description: "حاسبة ضريبة، عرض سعر يُحفظ، نقطة تعادل، ورابط واتساب مع رمز QR.",
};

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">الاستوديو</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        خمس أدوات تعمل الآن. عرض السعر وحده يُكتب في PostgreSQL، والباقي يبقى في المتصفح.
      </p>
      <div className="mt-8">
        <Studio />
      </div>
    </div>
  );
}
