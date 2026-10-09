import { PROJECTS } from "@/lib/projects";
import { TOOLS } from "@/lib/catalog";
import { CONTACT_NAME, DEFAULT_WA_TEXT, waUrl } from "@/lib/config";
import { Reveal } from "@/components/reveal";
import { VatPreview } from "@/components/vat-preview";
import { WhatsAppQr } from "@/components/whatsapp-qr";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const live = TOOLS.filter((tool) => tool.mode === "browser");
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-start gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-12 lg:pt-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-medium text-forest">ريشة 360</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">رتّب التسويق</span>
            <span className="block">قبل الإرسال.</span>
          </h1>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-muted">
            حاسبات وواتساب تعمل هنا. طلبات التصميم تُحفظ وتُراجع يدوياً قبل المتابعة.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/assessment" className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper">
              قيّم الجاهزية
            </Link>
            <Link href="/studio" className="inline-flex h-12 items-center rounded-full border border-line px-5">
              افتح الاستوديو
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <VatPreview />
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
          <p>
            <span className="block text-3xl font-semibold">20+</span>
            <span className="text-sm text-muted">عاماً في بناء الأنظمة، من المحفظة المنشورة</span>
          </p>
          <p>
            <span className="block text-3xl font-semibold">{PROJECTS.length}</span>
            <span className="text-sm text-muted">أعمال معروضة بدليل من المحفظة</span>
          </p>
          <p>
            <span className="block text-3xl font-semibold">{live.length}</span>
            <span className="text-sm text-muted">أدوات تعمل في المتصفح الآن</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl font-semibold tracking-tight">ما يُنجز هنا وما يُطلب.</h2>
          <p className="mt-3 max-w-[65ch] text-muted">
            الكتالوج من الصفحات العامة. التوليد المدفوع غير موصول، حتى لا يبدو الموقع كأنه ينتج صورة وهو لا يفعل.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="relative min-h-72 overflow-hidden rounded-3xl lg:col-span-4 lg:row-span-2">
            <Image
              src="https://picsum.photos/seed/risha-paper-press/1400/1000"
              alt="طاولة ورق وأدوات طباعة لمكتب تحضير مواد تسويق"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </div>
          <div className="rounded-3xl bg-forest p-6 text-paper lg:col-span-2">
            <h3 className="text-2xl font-semibold">وثائق تعمل الآن</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#d7e4dc]">
              {live
                .filter((tool) => tool.group === "وثائق")
                .map((tool) => (
                  <li key={tool.slug}>
                    <Link href={`/tools/${tool.slug}`} className="underline decoration-[#c8ad73] underline-offset-4">
                      {tool.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-[#e7f0ea] p-6 text-[#14241c] lg:col-span-2 dark:bg-[#1a2e26] dark:text-paper">
            <h3 className="text-2xl font-semibold">واتساب ورمز</h3>
            <p className="mt-3 text-sm leading-relaxed">الرابط والرمز يُبنيان على جهاز الزائر.</p>
            <Link href="/studio" className="mt-4 inline-flex h-11 items-center text-sm underline decoration-[#c8ad73] underline-offset-4">
              جرّب الاستوديو
            </Link>
          </div>
          <article className="rounded-3xl border border-line bg-card p-6 lg:col-span-3">
            <h3 className="text-2xl font-semibold">صور المنتجات</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              الخلفية البيضاء والكتالوج والشعار تُطلب عبر النموذج. لا زر يزعم أنه ولّد الصورة.
            </p>
          </article>
          <article className="rounded-3xl border border-line bg-card p-6 lg:col-span-3">
            <h3 className="text-2xl font-semibold">خمسة مجالات</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              عقار، مطعم، متجر، تعليم، وتسويق. الاقتراح أداة مناسبة، وليس دراسة عميل.
            </p>
            <Link href="/solutions" className="mt-4 inline-flex h-11 items-center text-sm underline decoration-gold underline-offset-4">
              الحلول
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h2 className="text-4xl font-semibold tracking-tight">أعمال سابقة بدليل.</h2>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            {PROJECTS.map((project) => (
              <article key={project.title} className="w-[min(100%,22rem)] shrink-0 rounded-3xl border border-line bg-paper p-5">
                <p className="text-sm text-muted">{project.status}</p>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.result}</p>
                <p className="mt-4 flex flex-wrap gap-3 text-sm">
                  {project.href ? (
                    <a href={project.href} className="underline decoration-gold underline-offset-4">
                      {project.hrefLabel}
                    </a>
                  ) : null}
                  <a href={project.caseHref} className="underline decoration-gold underline-offset-4">
                    دراسة الحالة
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <h2 className="text-4xl font-semibold tracking-tight">مراجع مفتوحة، ليست أدوات الموقع.</h2>
        <p className="mt-3 max-w-[65ch] text-muted">
          خمسون مهارة تسويق وسبعة وثلاثون وكيلاً من مستودعات MIT، مع بطاقة لـ OpenResearch. الطلب يبقى محادثة يدوية.
        </p>
        <Link href="/library" className="mt-6 inline-flex h-12 items-center rounded-full border border-line px-5">
          افتح المكتبة
        </Link>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_auto]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">راسل {CONTACT_NAME} عندما تجهز.</h2>
          <p className="mt-3 max-w-[65ch] text-muted">
            الرسالة الجاهزة تفتح واتساب. لا يوجد إرسال من الخادم.
          </p>
          <Link href="/contact" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-5 text-paper">
            نموذج الحفظ
          </Link>
        </div>
        <WhatsAppQr url={waUrl(DEFAULT_WA_TEXT)} label="افتح واتساب صهيب الصالح لمناقشة ريشة 360" />
      </section>
    </>
  );
}
