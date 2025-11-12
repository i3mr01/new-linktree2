"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why do I need a link in bio tool?",
      answer:
        "Every time you have something new to share, you have to update every single social media profile. A link in bio tool centralizes everything in one place. Update once, and it's live everywhere. Save time and never compromise on what you share.",
    },
    {
      question: "Can I monetize my Linkly page?",
      answer:
        "Absolutely! You can add affiliate links, sell products, offer services, and collect payments directly through your Linkly page. Many creators see incredible results because it removes extra steps in the purchase process.",
    },
    {
      question: "Is Linkly safe for all social media platforms?",
      answer:
        "Yes! Linkly is trusted by all major social platforms including Instagram, TikTok, Twitter, and YouTube. Our links are recognized and safe, giving your audience confidence when clicking.",
    },
    {
      question: "How many links can I add?",
      answer:
        "For optimal conversion, we recommend 3-7 links. However, you can add as many as you need. Use our organization features like sections and priorities to guide visitors to what matters most.",
    },
    {
      question: "Do I need a website to use Linkly?",
      answer:
        "Not at all! Linkly can serve as your complete online presence. Create a beautiful page in minutes without any technical knowledge. If you already have a website, you can easily integrate it into your Linkly page.",
    },
    {
      question: "Is Linkly really free?",
      answer:
        "Yes! Linkly is 100% free with no hidden costs, no credit card required, and no limitations. All features are available to everyone, forever.",
    },
    {
      question: "How do I track my link performance?",
      answer:
        "Linkly provides detailed analytics showing you clicks, traffic sources, device types, and more. You can see exactly which links are performing best and optimize accordingly.",
    },
    {
      question: "Can I customize my Linkly page?",
      answer:
        "Absolutely! Customize colors, fonts, layouts, backgrounds, and more. Make your Linkly page truly reflect your brand and personality with our easy-to-use customization tools.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* FAQ Hero */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about Linkly
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`h-6 w-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Still have questions CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can&apos;t find the answer you&apos;re looking for? We&apos;d love to hear from you.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              >
                Get started free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">Linkly</span>
              </div>
              <p className="text-sm leading-relaxed">
                The ultimate link in bio platform for creators, influencers, and businesses.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} Linkly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

