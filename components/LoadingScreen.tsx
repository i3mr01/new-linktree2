"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Hide loading screen after progress completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="text-center max-w-md mx-auto px-8">
            {/* Logo with Fade In */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
                Linkly
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                The Ultimate Link in Bio Platform
              </p>
            </motion.div>

            {/* Minimalist Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"
                />
              </div>
              
              {/* Progress Percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-400 mt-4 font-medium tabular-nums"
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.p>
            </motion.div>

            {/* Subtle Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-1 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

