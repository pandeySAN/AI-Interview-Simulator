import type { Metadata } from "next";
import { Mona_Sans as MonaSans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const monaSans = MonaSans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview System",
  description: "An AI Powered system to prepare for interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.variable} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
