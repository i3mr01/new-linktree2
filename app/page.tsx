import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                A link in bio built for you.
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join millions using Linkflow for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  Get started for free
                </Link>
                <Link
                  href="/#features"
                  className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Create and customize your Linkflow in minutes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linkflow automatically enhance it to match your brand and drive more clicks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Link in bio",
                  description: "Create a beautiful, customizable link in bio page that matches your brand",
                  icon: "🔗",
                },
                {
                  title: "Customize your Linkflow",
                  description: "Choose from multiple templates and customize colors, fonts, and layouts",
                  icon: "🎨",
                },
                {
                  title: "Link shortener",
                  description: "Create trackable, shareable short links for all your content",
                  icon: "✂️",
                },
                {
                  title: "QR code generator",
                  description: "Turn links into scannable QR codes for offline marketing",
                  icon: "📱",
                },
                {
                  title: "Analytics",
                  description: "Track clicks, engagement and audience insights with detailed analytics",
                  icon: "📊",
                },
                {
                  title: "Social integration",
                  description: "Share across all platforms - Instagram, TikTok, Twitter, YouTube and more",
                  icon: "🌐",
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Trusted by creators worldwide</h2>
              <p className="text-xl text-gray-600">See what people are saying about Linkflow</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "Linkflow simplifies the process for creators to share multiple parts of themselves in one inclusive link.",
                  author: "Riley Lemon",
                  role: "Content Creator",
                },
                {
                  quote: "Linkflow helps my customers get where they need to go. It's fast and easy.",
                  author: "Patti Chimkire",
                  role: "Founder and Pastry Chef",
                },
                {
                  quote: "I use Linkflow's analytics to better understand my audience and what converts them.",
                  author: "Luke Kidgell",
                  role: "Comedian",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Questions? Answered</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Why do I need a link in bio tool?",
                  answer: "Every time you've got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It's time-consuming and complicated. A link in bio tool means you never have to compromise - you can keep everything you want to share online in one link. When you've got a change, you only ever have to make it once.",
                },
                {
                  question: "Can you get paid and sell things from a Linkflow?",
                  answer: "Yes, you can! You can collect revenue from affiliate links, and sell your products right in your Linkflow. A lot of Linkflow creators see incredible results with online sales because it removes the extra steps involved in a purchase.",
                },
                {
                  question: "Is Linkflow safe to use on all of my social media profiles?",
                  answer: "Linkflow is trusted by all social platforms. Because Linkflow is a trusted link-in-bio tool, your audience will feel comfortable and safe clicking on your links.",
                },
                {
                  question: "How many links should I have on my Linkflow?",
                  answer: "If your priority is click-throughs and conversion, we recommend having 3-7 links on your Linkflow at once. Including too many options for your visitors slows down their course of action. However, you can include more links if your priority is display, education and showcasing.",
                },
                {
                  question: "Do I need a website to use Linkflow?",
                  answer: "No, you don't! Linkflow can act as your very own mini-website to share, sell and grow without any of the time and effort it takes to build and maintain a regular website. If you already have a website, that's great: you can add it to your Linkflow.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-white rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-600 font-normal">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Unlimited links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <Link
                  href="/login"
                  className="block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Get started
                </Link>
              </div>

              <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white border-2 border-blue-500 relative">
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal opacity-90">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Premium templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Custom domain</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/login"
                  className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Jumpstart your corner of the internet today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of creators, influencers, and businesses using Linkflow to grow their online presence.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Get started for free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
                <span className="text-xl font-bold text-white">Linkflow</span>
              </div>
              <p className="text-sm">The fast, friendly and powerful link in bio tool.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} Linkflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
