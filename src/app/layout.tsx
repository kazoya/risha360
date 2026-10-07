import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Suspense } from "react";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ريشة 360 | منصة التسويق",
    template: "%s | ريشة 360",
  },
  description:
    "منصة تسويق عربية. أدوات الوثائق والواتساب تعمل في المتصفح، وطلبات التصميم تُحفظ للمراجعة اليدوية.",
};

const themeBoot = `try{if(localStorage.getItem('risha-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${plex.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-card focus:px-3 focus:py-2">
          تخط إلى المحتوى
        </a>
        <Suspense fallback={<div className="h-16 border-b border-line bg-paper" />}>
          <Header />
        </Suspense>
        <main id="main" className="flex-1 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
