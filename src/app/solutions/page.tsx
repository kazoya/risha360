import { SECTORS, getTool } from "@/lib/catalog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الحلول",
  description: "اقتراح أدوات حسب المجال: عقار، مطعم، متجر، تعليم، وتسويق.",
};

export default function SolutionsPage() {
  const [featured, ...rest] = SECTORS;
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">حلول حسب المجال</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        المجالات مذكورة في الصفحة العامة للحلول. الربط اقتراح أدوات، وليس نتائج عملاء.
      </p>
      <section className="mt-10 grid items-center gap-6 lg:grid-cols-2">
        <div className="relative min-h-80 overflow-hidden rounded-3xl">
          <Image
            src="https://picsum.photos/seed/risha-market-stall/1400/1000"
            alt="واجهة محل ببضائع مرتبة على الرف"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">{featured.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{featured.summary}</p>
          <ul className="mt-4 space-y-2">
            {featured.tools.map((slug) => {
              const tool = getTool(slug);
              if (!tool) return null;
              return (
                <li key={slug}>
                  <Link href={`/tools/${slug}`} className="underline decoration-gold underline-offset-4">
                    {tool.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {rest.map((sector) => (
          <li key={sector.slug} className="rounded-3xl border border-line bg-card p-5">
            <h2 className="text-2xl font-semibold">{sector.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{sector.summary}</p>
            <p className="mt-4 text-sm">
              {sector.tools
                .map((slug) => getTool(slug)?.title)
                .filter(Boolean)
                .join("، ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
