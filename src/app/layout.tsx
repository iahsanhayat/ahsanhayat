import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahsanhayat.vercel.app"),
  title: "Ahsan Hayat — AI Video Creator & Creative Content Producer",
  description:
    "Ahsan Hayat is an AI Video Creator and Creative Content Producer creating cinematic AI films, short-form content, storytelling videos and AI-powered advertising.",
  keywords: [
    "AI Video Creator",
    "Creative Content Producer",
    "AI Filmmaker",
    "Short-form Content",
    "AI Advertising",
    "The Ash Phoenix",
    "Generative Video",
    "Ahsan Hayat",
  ],
  authors: [{ name: "Ahsan Hayat" }],
  openGraph: {
    title: "Ahsan Hayat — AI Video Creator & Creative Content Producer",
    description:
      "I turn ideas into cinematic AI-powered videos, stories, and social content.",
    url: "https://ahsanhayat.vercel.app",
    siteName: "Ahsan Hayat Portfolio",
    images: [
      {
        url: "/images/ash-phoenix-cover.jpg",
        width: 1280,
        height: 720,
        alt: "The Ash Phoenix — AI Short Film by Ahsan Hayat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahsan Hayat — AI Video Creator & Creative Content Producer",
    description:
      "I turn ideas into cinematic AI-powered videos, stories, and social content.",
    images: ["/images/ash-phoenix-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} light scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
                var savedTheme = localStorage.getItem('ahsan_portfolio_theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#151412] min-h-screen font-sans selection:bg-[#C9A86A]/25 selection:text-[#151412] antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
