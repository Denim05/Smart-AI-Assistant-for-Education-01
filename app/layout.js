import React from "react";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "GENzAI — AI Career Coach for Gen Z Professionals",
    template: "%s | GENzAI",
  },
  description:
    "ATS resume scoring, LinkedIn optimization, AI career roadmaps, interview prep, and live job board — all in one platform. Built for the next generation of professionals.",
  keywords: [
    "AI career coach", "ATS resume scorer", "LinkedIn optimizer",
    "career roadmap", "interview preparation", "job board India",
    "resume builder", "Gen Z careers", "GENzAI",
  ],
  authors: [{ name: "GENzAI Technologies" }],
  creator: "GENzAI Technologies",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://genzai.in",
    siteName: "GENzAI",
    title: "GENzAI — AI Career Coach for Gen Z",
    description: "Stop applying blindly. Start landing offers with AI-powered career tools.",
    images: [{ url: "/banner.jpeg", width: 1280, height: 720, alt: "GENzAI Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GENzAI — AI Career Coach for Gen Z",
    description: "ATS scoring, LinkedIn optimizer, career roadmaps and more.",
    images: ["/banner.jpeg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg", apple: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster richColors position="bottom-right" />
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
