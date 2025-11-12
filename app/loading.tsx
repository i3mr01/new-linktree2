"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Linkly
          </h1>
        </motion.div>

        {/* Elegant Spinner */}
        <div className="relative w-12 h-12 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-gray-900 rounded-full" />
          </motion.div>
        </div>

        {/* Subtle Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm text-gray-500 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

