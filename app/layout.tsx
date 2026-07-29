import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MegaClick | חידונים, סקרים ואירועים חיים",
    template: "%s | MegaClick",
  },
  description:
    "פלטפורמה חכמה ליצירת חידונים, סקרים, משחקים ואירועים אינטראקטיביים בזמן אמת — עם AI, טלפונים כשרים, תעודות, דוחות וניתוחי קהל.",
  keywords: [
    "MegaClick",
    "חידונים",
    "סקרים",
    "טלפון כשר",
    "אירועים חיים",
    "AI",
    "טריוויה",
    "מערכת הצבעה",
  ],
  authors: [{ name: "MegaClick" }],
  creator: "MegaClick",
  openGraph: {
    title: "MegaClick | הדור הבא של מעורבות קהל",
    description:
      "חידונים, סקרים, משחקים ואירועים חיים בסנכרון מלא בין סמארטפונים לטלפונים כשרים.",
    type: "website",
    locale: "he_IL",
    siteName: "MegaClick",
  },
  twitter: {
    card: "summary_large_image",
    title: "MegaClick",
    description: "הדור הבא של חידונים, סקרים ואירועים חיים.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <body className={`${rubik.variable} min-h-screen bg-[#05050d] font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
