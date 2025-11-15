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
  Instagram,
  Twitter,
  Youtube,
  Music2,
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
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight hero-element">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  The link in bio
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  built for creators
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed hero-element px-4">
                One link to share everything you create, curate, and sell. Beautiful pages, powerful analytics, unlimited customization.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center hero-element px-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
                <Link
                  href="/signup"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get started free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="#features"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-center"
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
                {/* Browser Mockup */}
                <div className="relative max-w-4xl mx-auto">
                  {/* Browser Chrome */}
                  <div className="bg-gray-100 rounded-t-2xl p-3 border border-b-0 border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="bg-white rounded-lg px-4 py-1.5 text-sm text-gray-600 flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5 text-gray-400" />
                          <span className="font-medium">linkly.to/yourname</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Browser Content */}
                  <div className="relative rounded-b-2xl overflow-hidden shadow-2xl border border-t-0 border-gray-200">
                    <div className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6 sm:p-8 md:p-12 overflow-hidden">
                      {/* Decorative Background Elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-violet-400/20 rounded-full blur-3xl" />
                      
                      {/* Profile Section */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="relative flex flex-col items-center mb-8"
                      >
                        <div className="relative mb-4">
                          {/* Profile Image with Ring */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-xl">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                                AJ
                              </div>
                            </div>
                          </div>
                          {/* Verified Badge */}
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Alex Johnson</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3">Digital Creator & Entrepreneur</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Active now</span>
                          </div>
                          <span>•</span>
                          <span>2.5K followers</span>
                        </div>
                      </motion.div>

                      {/* Links */}
                      <div className="relative space-y-3 max-w-lg mx-auto">
                        {[
                          { 
                            title: "🎨 My Creative Portfolio", 
                            subtitle: "Latest designs & projects",
                            gradient: "from-blue-500 to-cyan-500",
                            borderGradient: "from-blue-400 to-cyan-400",
                            delay: 1.4 
                          },
                          { 
                            title: "🎥 Watch My Latest Video", 
                            subtitle: "How I grew to 100K subscribers",
                            gradient: "from-red-500 to-pink-500",
                            borderGradient: "from-red-400 to-pink-400",
                            delay: 1.5 
                          },
                          { 
                            title: "🛍️ Shop Exclusive Merch", 
                            subtitle: "Limited edition items",
                            gradient: "from-purple-500 to-fuchsia-500",
                            borderGradient: "from-purple-400 to-fuchsia-400",
                            delay: 1.6 
                          },
                          { 
                            title: "📅 Book a 1-on-1 Call", 
                            subtitle: "30 min consultation",
                            gradient: "from-emerald-500 to-teal-500",
                            borderGradient: "from-emerald-400 to-teal-400",
                            delay: 1.7 
                          },
                        ].map((link, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: link.delay }}
                            className="group relative"
                          >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${link.borderGradient} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 blur-sm`} />
                            <div className="relative bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl p-3.5 sm:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200/50">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold text-sm sm:text-base text-gray-900 mb-0.5">{link.title}</div>
                                  <div className="text-xs text-gray-500">{link.subtitle}</div>
                                </div>
                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Social Icons */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="relative flex justify-center gap-3 mt-8"
                      >
                        {[
                          { name: "Instagram", gradient: "from-purple-500 via-pink-500 to-orange-500", Icon: Instagram },
                          { name: "Twitter", gradient: "from-blue-400 to-blue-600", Icon: Twitter },
                          { name: "YouTube", gradient: "from-red-500 to-red-600", Icon: Youtube },
                          { name: "TikTok", gradient: "from-gray-800 to-gray-900", Icon: Music2 },
                        ].map((social, idx) => {
                          const SocialIcon = social.Icon;
                          return (
                            <motion.div
                              key={social.name}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.9 + idx * 0.1, type: "spring" }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${social.gradient} shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center`}
                            >
                              <SocialIcon className="w-5 h-5 text-white" />
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating Analytics Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 2, type: "spring" }}
                    className="hidden sm:block absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">1.2K</div>
                        <div className="text-xs text-gray-600">Clicks today</div>
                      </div>
                    </div>
                  </motion.div>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Everything you need to
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  grow your audience
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Powerful features designed to help you create, customize, and optimize your link in bio page.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredFeature(idx)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="group relative p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl transition-opacity`}
                      animate={{ opacity: hoveredFeature === idx ? 0.08 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 sm:p-3 mb-4 sm:mb-6 transition-transform duration-300`}
                      animate={{ 
                        scale: hoveredFeature === idx ? 1.1 : 1,
                        rotate: hoveredFeature === idx ? 5 : 0
                      }}
                    >
                      <Icon className="h-full w-full text-white" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 relative">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed relative">{feature.description}</p>
                    
                    {/* Interactive indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-400"
                      animate={{ opacity: hoveredFeature === idx ? 1 : 0 }}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-3 w-3" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto text-center">
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
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center group cursor-default"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 opacity-90 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                      <div className="text-blue-100 text-xs sm:text-sm font-medium">{stat.label}</div>
                      {stat.subLabel && (
                        <div className="text-blue-200 text-xs mt-1 opacity-75 hidden sm:block">{stat.subLabel}</div>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                <span className="text-white">
                  Built for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  everyone
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 px-4">
                From creators to businesses, Linkly adapts to your unique needs.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mb-12 px-4">
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
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative cursor-pointer"
                >
                  <motion.div 
                    className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradientBorder} rounded-2xl blur`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className={`relative h-full bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 inline-block"
                    >
                      {item.emoji}
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.description}</p>
                    
                    {/* Animated background blob */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
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
                  href="/signup"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                >
                  Start for free
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </motion.div>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Completely free.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Forever.
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">No credit card required. No hidden fees. No limitations.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white shadow-2xl border-2 border-blue-500"
              >
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-green-400 text-gray-900 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold">
                  100% Free
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Everything You Need</h3>
                <div className="text-4xl sm:text-5xl font-bold mb-6">
                  $0<span className="text-lg sm:text-xl opacity-90 font-normal">/forever</span>
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
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
                    <li key={item} className="flex items-center gap-2 sm:gap-3">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="block w-full text-center px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Create your Linkly
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                Join thousands sharing everything they create from one simple link
              </p>
              
              <div className="max-w-2xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 sm:p-3 bg-white rounded-2xl shadow-2xl border border-gray-200">
                  <div className="flex items-center flex-1 w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">linkly.to/</span>
                    <input
                      type="text"
                      placeholder="yourname"
                      className="flex-1 bg-transparent border-none outline-none text-gray-400 text-sm sm:text-base md:text-lg placeholder:text-gray-400"
                    />
                  </div>
                  <Link
                    href="/signup"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 whitespace-nowrap text-center"
                  >
                    Claim your link
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                  Free forever • No credit card • Set up in 2 minutes
                </p>
              </div>
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
