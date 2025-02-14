import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap'
});

export const metadata: Metadata = {
  title: "ID Hub",
  description: "A place to show lost and found Identity Documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
