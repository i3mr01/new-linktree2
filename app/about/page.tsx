"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Heart, Users, Target, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Linkly
              </span>
            </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to help creators share everything they create from one simple link.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-24"
          >
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Linkly was born from a simple observation: creators were struggling to share all their content 
                  across multiple platforms. Instagram only allowed one link in bio, and managing multiple landing 
                  pages was complicated and expensive.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We built Linkly to solve this problem. A beautiful, free, and powerful platform that lets anyone 
                  create a stunning link-in-bio page in minutes. No coding required, no credit card needed, 
                  no hidden fees.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, thousands of creators, influencers, and businesses use Linkly to connect their audience 
                  with everything they create. And we&apos;re just getting started.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Our Values
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Creator First",
                  description: "Everything we build is designed with creators in mind.",
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "We believe in the power of community and collaboration.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Target,
                  title: "Simplicity",
                  description: "Complex problems deserve simple, elegant solutions.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  description: "We're constantly pushing boundaries and improving.",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} p-3 mb-4`}>
                      <Icon className="h-full w-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join thousands of creators</h2>
            <p className="text-xl mb-8 opacity-90">Start sharing everything you create from one link</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get started free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">© {new Date().getFullYear()} Linkly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

