"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Animated Logo with Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Linkly
              </h1>
            </motion.div>

            {/* Spinning Circle Loader */}
            <div className="relative w-16 h-16 mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-600"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-600 border-l-pink-600"
              />
            </div>

            {/* Loading Text with Dots */}
            <div className="flex items-center justify-center gap-1 text-gray-600 text-lg">
              <span>Loading</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.4,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            </div>
          </motion.div>

          {/* Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: 0,
                }}
                animate={{
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

