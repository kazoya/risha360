import { PROJECTS } from "@/lib/projects";
import { PORTFOLIO_URL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأعمال",
  description: "أعمال منشورة من محفظة صهيب الصالح، بالحالة والدليل كما وردا في المصدر.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">أعمال سابقة</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        المصدر{" "}
        <a className="underline decoration-gold underline-offset-4" href={PORTFOLIO_URL}>
          محفظة التسليم
        </a>
        . الحالة كما نُشرت: حي، تجريبي، أو نموذج أولي.
      </p>
      <div className="mt-10 grid gap-6">
        {PROJECTS.map((project, index) => (
          <article
            key={project.title}
            className={`rounded-3xl p-6 ${index === 0 ? "bg-forest text-paper" : "border border-line bg-card"}`}
          >
            <p className={index === 0 ? "text-[#d7e4dc]" : "text-muted"}>{project.status}</p>
            <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
            <p className="mt-3 leading-relaxed">{project.problem}</p>
            <p className={`mt-3 text-sm leading-relaxed ${index === 0 ? "text-[#d7e4dc]" : "text-muted"}`}>
              {project.result} الدليل: {project.evidence}
            </p>
            <p className="mt-4 flex flex-wrap gap-4 text-sm">
              {project.href ? (
                <a className="underline decoration-[#c8ad73] underline-offset-4" href={project.href}>
                  {project.hrefLabel}
                </a>
              ) : null}
              <a className="underline decoration-[#c8ad73] underline-offset-4" href={project.caseHref}>
                دراسة الحالة
              </a>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
