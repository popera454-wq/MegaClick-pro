import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ 
  subsets: ["latin", "hebrew"],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-rubik'
});

export const metadata: Metadata = {
  title: "MegaClick | Next-Gen Live Polling Engine",
  description: "הדור הבא של החידונים והסקרים, בסנכרון מלא בין סמארטפון לטלפון כשר.",
  themeColor: "#03030a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ה-lang ישתנה דינמית על ידי ה-Client Component, אבל מתחילים עם he
    <html lang="he" dir="rtl" className="scroll-smooth">
      <body className={`${rubik.variable} font-sans min-h-screen bg-[#03030a]`}>
        {children}
      </body>
    </html>
  );
}