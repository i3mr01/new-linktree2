"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MarketingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Linkflow
      </motion.h1>
      <p className="text-gray-600 max-w-xl mb-8">
        A clean, extendable link-in-bio with analytics, built on Next.js App Router.
      </p>
      <div className="flex gap-4">
        <Link className="px-4 py-2 bg-black text-white rounded" href="/dashboard">
          Go to Dashboard
        </Link>
        <Link className="px-4 py-2 border rounded" href="/amr">
          View Example Profile
        </Link>
      </div>
    </main>
  );
}


