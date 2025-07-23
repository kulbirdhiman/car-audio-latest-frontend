import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "@/components/layout/GlovalProvider";

// Optional: Add custom fonts if used
// import { Geist } from "next/font/google"; // example if using
// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Car Audio Systems | Car Audio Expert",
  description: "Explore top-quality car stereos and accessories with smart navigation, CarPlay, and more.",
  keywords: ["car stereo", "car audio", "android head unit", "car accessories"], // ✅ optional
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster position="top-right" reverseOrder={false} />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
