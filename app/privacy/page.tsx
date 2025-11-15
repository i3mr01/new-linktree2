"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 mx-auto mb-6">
              <Shield className="h-full w-full text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Last updated: November 15, 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200"
          >
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Linkly, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Personal Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you create an account, we collect information such as your name, email address, 
                  username, and any other information you choose to provide.
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Usage Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  We automatically collect certain information about your device and how you interact with 
                  our service, including IP address, browser type, pages visited, and time spent on pages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  The security of your data is important to us. We implement appropriate technical and 
                  organizational measures to protect your personal information against unauthorized or 
                  unlawful processing, accidental loss, destruction, or damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may employ third-party companies and individuals to facilitate our service, provide 
                  the service on our behalf, perform service-related services, or assist us in analyzing 
                  how our service is used. These third parties have access to your personal information 
                  only to perform these tasks on our behalf.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing your personal information</li>
                  <li>Request transfer of your personal information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and 
                  hold certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Children&apos;s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our service does not address anyone under the age of 13. We do not knowingly collect 
                  personally identifiable information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Changes to This Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@linkly.to" className="text-blue-600 hover:underline">
                    privacy@linkly.to
                  </a>
                </p>
              </section>
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

