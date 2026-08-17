import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inefor - Inovação e Formação de Excelência",
  description:
    "Formação técnica, tecnológica e administrativa em Angola. Cursos certificados, treinamentos profissionais e eventos de alto impacto em Luanda.",
  keywords: ["formação", "cursos", "angola", "luanda", "cisco", "ccna", "gestão", "tecnologia"],
};

// Inline script runs before React hydration — prevents flash and ensures
// the correct theme class is on <html> from the very first paint.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('inefor-theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO" suppressHydrationWarning>
      <head>
        {/* This script runs synchronously before any CSS/React paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
