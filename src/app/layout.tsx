import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zman.dev",
  description: "The greatest trash dev you could ever ask for!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
