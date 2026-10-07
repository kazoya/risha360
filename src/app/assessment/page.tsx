import { AssessmentForm } from "@/components/assessment-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الجاهزية",
  description: "تقدير أولي لعنق الزجاجة التسويقي، يُحفظ في قاعدة البيانات ولا يرسل حملة.",
};

export default function AssessmentPage() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">جاهزية التسويق</h1>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-muted">
          أربعة أسئلة. الناتج تقدير للعرض، محفوظ برقم مرجع، وبلا إرسال.
        </p>
      </div>
      <AssessmentForm />
    </div>
  );
}
