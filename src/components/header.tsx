"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";

function subscribeTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function themeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

const LINKS = [
  { href: "/tools", label: "الأدوات" },
  { href: "/library", label: "المكتبة" },
  { href: "/solutions", label: "الحلول" },
  { href: "/work", label: "الأعمال" },
  { href: "/studio", label: "الاستوديو" },
  { href: "/assessment", label: "الجاهزية" },
  { href: "/contact", label: "تواصل" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dark = useSyncExternalStore(subscribeTheme, themeSnapshot, () => false);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("risha-theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          ريشة 360
        </Link>
        <nav className="ms-auto hidden items-center gap-1 xl:flex" aria-label="الرئيسي">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm ${active ? "bg-forest text-paper" : "text-ink hover:bg-card"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          className="ms-auto inline-flex size-11 items-center justify-center rounded-full border border-line xl:ms-2"
          aria-label={dark ? "الوضع الفاتح" : "الوضع الداكن"}
        >
          {dark ? <Sun size={20} weight="regular" /> : <Moon size={20} weight="regular" />}
        </button>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line xl:hidden"
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-line px-4 py-3 xl:hidden" aria-label="الجوال">
          <ul className="grid gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base hover:bg-card"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
