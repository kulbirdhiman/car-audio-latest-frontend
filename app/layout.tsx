import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "@/components/layout/GlovalProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Best Car Audio Systems | Car Audio Expert",
  description:
    "Explore top-quality car stereos and accessories with smart navigation, CarPlay, and more.",
  keywords: [
    "car stereo",
    "car audio",
    "android head unit",
    "car accessories",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics script (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EXJW0B9KT0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EXJW0B9KT0');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Toaster position="top-right" reverseOrder={false} />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
