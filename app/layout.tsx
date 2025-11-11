import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Linkly - The Ultimate Link in Bio Platform",
  description: "Create beautiful link-in-bio pages, track analytics, and grow your audience. Join millions of creators using Linkly.",
  keywords: ["link in bio", "linktree alternative", "social media links", "bio link", "creator tools"],
  openGraph: {
    title: "Linkly - The Ultimate Link in Bio Platform",
    description: "Create beautiful link-in-bio pages, track analytics, and grow your audience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <SmoothScroll>
          <AuthProvider>{children}</AuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}


