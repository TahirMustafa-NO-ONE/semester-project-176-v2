import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BannerSlider from "@/components/BannerSlider";
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Max",
  description: "Pizza Max - Best Pizza in Town",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen">
          {/* Main content */}
          <div className="relative z-0">
            <Navbar />
            <BannerSlider />
            <main className="min-h-[400px] bg-gray-100">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        {modal}
      </body>
    </html>
  );
}
