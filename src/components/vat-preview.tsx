import { VAT_RATES } from "@/lib/calc";
import Link from "next/link";

export function VatPreview() {
  return (
    <aside className="hidden rounded-3xl bg-forest p-6 text-paper md:block">
      <p className="text-sm text-[#d7e4dc]">نسب الضريبة في الاستوديو</p>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {VAT_RATES.map((row) => (
          <li key={row.code}>
            <span className="block text-3xl font-semibold leading-none">{row.rate}%</span>
            <span className="mt-1 block text-sm text-[#d7e4dc]">{row.label}</span>
          </li>
        ))}
      </ul>
      <Link href="/studio" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#c8ad73] px-4 font-medium text-[#14241c]">
        افتح الحاسبة
      </Link>
    </aside>
  );
}
