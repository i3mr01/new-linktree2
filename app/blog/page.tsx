"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "10 Tips to Optimize Your Link in Bio",
      excerpt: "Learn how to maximize engagement and conversions with your Linkly page.",
      date: "Nov 10, 2025",
      readTime: "5 min read",
      category: "Tips & Tricks",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "The Ultimate Guide to Analytics",
      excerpt: "Understand your audience better with comprehensive analytics insights.",
      date: "Nov 5, 2025",
      readTime: "8 min read",
      category: "Analytics",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "How Creators Are Using Linkly",
      excerpt: "Real stories from content creators who grew their audience with Linkly.",
      date: "Oct 28, 2025",
      readTime: "6 min read",
      category: "Case Studies",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Customization Best Practices",
      excerpt: "Design tips to make your link page stand out from the crowd.",
      date: "Oct 20, 2025",
      readTime: "4 min read",
      category: "Design",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Building Your Personal Brand",
      excerpt: "How to use Linkly as the hub of your online presence.",
      date: "Oct 15, 2025",
      readTime: "7 min read",
      category: "Branding",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "New Features: What's Coming Next",
      excerpt: "A sneak peek at exciting features we're building for you.",
      date: "Oct 10, 2025",
      readTime: "3 min read",
      category: "Product Updates",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

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
                Linkly
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tips, insights, and stories to help you grow your audience
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get the latest tips, insights, and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 outline-none"
              />
              <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
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

