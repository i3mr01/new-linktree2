"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Link2,
  BarChart3,
  Palette,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Rocket,
} from "lucide-react";
import gsap from "gsap";

interface Stats {
  totalUsers: number;
  totalLinks: number;
  totalClicks: number;
  usersToday: number;
  linksToday: number;
  clicksToday: number;
  averageRating: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B+`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K+`;
  }
  return num.toString();
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-element"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch real stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
    // Refresh stats every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Link2,
      title: "Link in Bio",
      description: "Create a beautiful, customizable link in bio page that matches your brand perfectly.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Customizable Templates",
      description: "Choose from multiple premium templates and customize every detail to match your style.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track clicks, engagement, and audience insights with detailed, real-time analytics.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed. Your links load instantly, providing the best experience for your audience.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Share across all platforms - Instagram, TikTok, Twitter, YouTube, and more.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "100% Free Forever",
      description: "No credit card required. All features are completely free with no hidden costs or limitations.",
      color: "from-green-500 to-emerald-500",
    },
  ];

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
  ];

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-8 hero-element"
              >
                <span className="text-sm font-medium text-green-700">✨ 100% Free Forever - No Credit Card Required</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 hero-element">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  The link in bio
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  built for creators
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed hero-element">
                One link to share everything you create, curate, and sell. Beautiful pages, powerful analytics, unlimited customization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-element">
                <Link
                  href="/login"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get started free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  See how it works
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-16 hero-element"
              >
                <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔗</div>
                      <p className="text-gray-600 font-medium">Your beautiful Linkly page preview</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={featuresRef}
          className="py-32 bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.01]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Everything you need to
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  grow your audience
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to help you create, customize, and optimize your link in bio page.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
              {[
                { 
                  icon: Users, 
                  value: stats ? formatNumber(stats.totalUsers) : "...", 
                  label: "Active Users",
                  subLabel: stats ? `${stats.usersToday} today` : undefined
                },
                { 
                  icon: Link2, 
                  value: stats ? formatNumber(stats.totalLinks) : "...", 
                  label: "Links Created",
                  subLabel: stats ? `${stats.linksToday} today` : undefined
                },
                { 
                  icon: TrendingUp, 
                  value: stats ? formatNumber(stats.totalClicks) : "...", 
                  label: "Clicks Tracked",
                  subLabel: stats ? `${stats.clicksToday} today` : undefined
                },
                { 
                  icon: Star, 
                  value: stats ? `${stats.averageRating}/5` : "...", 
                  label: "User Rating" 
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <Icon className="h-8 w-8 mb-3 opacity-90" />
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                    {stat.subLabel && (
                      <div className="text-blue-200 text-xs mt-1 opacity-75">{stat.subLabel}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who is Linkly For Section */}
        <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">
                  Built for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  everyone
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-4">
                From creators to businesses, Linkly adapts to your unique needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
              {[
                {
                  title: "Content Creators",
                  description: "Share videos, podcasts, blogs, and merch in one place.",
                  gradient: "from-red-500/20 via-pink-500/20 to-rose-500/20",
                  gradientBorder: "from-red-500 via-pink-500 to-rose-500",
                  emoji: "🎥",
                },
                {
                  title: "Influencers",
                  description: "Monetize your following with brand deals and exclusive content.",
                  gradient: "from-purple-500/20 via-pink-500/20 to-fuchsia-500/20",
                  gradientBorder: "from-purple-500 via-pink-500 to-fuchsia-500",
                  emoji: "📱",
                },
                {
                  title: "Businesses",
                  description: "Drive traffic to your products, services, and booking pages.",
                  gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
                  gradientBorder: "from-blue-500 via-cyan-500 to-teal-500",
                  emoji: "🏪",
                },
                {
                  title: "Artists",
                  description: "Showcase your portfolio, music, tickets, and creative work.",
                  gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
                  gradientBorder: "from-green-500 via-emerald-500 to-teal-500",
                  emoji: "🎨",
                },
                {
                  title: "Freelancers",
                  description: "Display services, testimonials, and make it easy to get hired.",
                  gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
                  gradientBorder: "from-orange-500 via-amber-500 to-yellow-500",
                  emoji: "💼",
                },
                {
                  title: "Events",
                  description: "Promote events, sell tickets, and keep attendees informed.",
                  gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
                  gradientBorder: "from-indigo-500 via-purple-500 to-pink-500",
                  emoji: "🎉",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradientBorder} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
                  <div className={`relative h-full bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300`}>
                    <div className="text-6xl mb-4">{item.emoji}</div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-block mb-8 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <p className="text-lg text-gray-300">
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">No matter what you do</span>
                  {" "}— Linkly helps you do it better
                </p>
              </div>
              <div>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                >
                  Start for free
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Questions?
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  We&apos;ve got answers
                </span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all bg-white"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Completely free.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Forever.
                </span>
              </h2>
              <p className="text-xl text-gray-600">No credit card required. No hidden fees. No limitations.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white shadow-2xl border-2 border-blue-500"
              >
                <div className="absolute top-6 right-6 bg-green-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold">
                  100% Free
                </div>
                <h3 className="text-3xl font-bold mb-2">Everything You Need</h3>
                <div className="text-5xl font-bold mb-6">
                  $0<span className="text-xl opacity-90 font-normal">/forever</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Unlimited links",
                    "All templates included",
                    "Advanced analytics",
                    "Full customization",
                    "Mobile responsive",
                    "Custom domain support",
                    "Priority support",
                    "No branding required",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className="block w-full text-center px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className="h-16 w-16 mx-auto mb-8 text-blue-400" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Ready to grow your audience?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join millions of creators, influencers, and businesses using Linkly to grow their online presence.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              >
                Get started for free
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
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
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
