import { MODE_LABEL, TOOLS, getTool } from "@/lib/catalog";
import { DEFAULT_WA_TEXT, waUrl } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "أداة" };
  return { title: tool.title, description: tool.summary };
}

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const studio = tool.mode === "browser";
  return (
    <article className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <p className="text-sm text-muted">{tool.group}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{tool.title}</h1>
      <p className="mt-4 text-lg leading-relaxed">{tool.summary}</p>
      <p className="mt-4 text-sm text-muted">{MODE_LABEL[tool.mode]}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {studio ? (
          <Link href="/studio" className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper">
            افتحها في الاستوديو
          </Link>
        ) : (
          <a
            href={waUrl(`مرحباً، أريد طلب أداة ${tool.title} ضمن ريشة 360.`)}
            className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper"
          >
            اطلبها عبر واتساب
          </a>
        )}
        <Link href="/tools" className="inline-flex h-12 items-center rounded-full border border-line px-5">
          كل الأدوات
        </Link>
      </div>
      {tool.mode !== "browser" ? (
        <p className="mt-6 text-sm text-muted">الرسالة الجاهزة: {DEFAULT_WA_TEXT}</p>
      ) : null}
    </article>
  );
}
