import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealEstate Manager - 스마트한 부동산 관리",
  description: "건물주를 위한 통합 부동산 관리 솔루션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-64 flex flex-col">
            <Navbar />
            <main className="flex-1 p-8 bg-background">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

