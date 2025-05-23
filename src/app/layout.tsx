import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS S3 Bucket Next.js Testing Project",
  description: "A Next.js 15+ testing project integrated with AWS S3 bucket for upload and retrieval",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-serif bg-black">
        {children}
      </body>
    </html>
  );
}
