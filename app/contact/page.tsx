"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

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
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Get in
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600">We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3 mb-4">
                  <Mail className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Email Us</h3>
                <p className="text-gray-600 mb-3">For general inquiries and support</p>
                <a href="mailto:hello@linkly.to" className="text-blue-600 font-medium hover:underline">
                  hello@linkly.to
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 mb-4">
                  <MessageSquare className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Live Chat</h3>
                <p className="text-gray-600 mb-3">Chat with our support team</p>
                <button className="text-blue-600 font-medium hover:underline">
                  Start a conversation
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Need help?</h3>
                <p className="mb-4 opacity-90">Check out our FAQ for quick answers</p>
                <Link
                  href="/faq"
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Visit FAQ
                </Link>
              </div>
            </motion.div>
          </div>
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

