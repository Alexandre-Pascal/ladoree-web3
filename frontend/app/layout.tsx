import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

import { Toaster } from 'react-hot-toast';

import CustomRaimbowKitProvider from "./CustomRaimbowKitProvider";

import Providers from './Providers';
import TokenCollector from "@/components/shared/TokenCollector";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ladoree",
  description: "Ladoree, la galerie d'art en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="96x96" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CustomRaimbowKitProvider>
          <Header />
          <TokenCollector />
          <main className="flex-grow">
            <Toaster />
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </CustomRaimbowKitProvider>
      </body>
    </html>
  );
}
