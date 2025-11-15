"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { FileText } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-full w-full text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Terms of Service
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
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using Linkly, you agree to be bound by these Terms of Service and all 
                  applicable laws and regulations. If you do not agree with any of these terms, you are 
                  prohibited from using or accessing this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Use License</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily use Linkly for personal, non-commercial purposes. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained in Linkly</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">User Accounts</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  When you create an account with us, you must provide accurate, complete, and current 
                  information at all times. You are responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Maintaining the confidentiality of your account and password</li>
                  <li>Restricting access to your account</li>
                  <li>All activities that occur under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Content Guidelines</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  You may not use Linkly to share content that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Is illegal, harmful, threatening, abusive, or discriminatory</li>
                  <li>Infringes any patent, trademark, trade secret, copyright or other proprietary rights</li>
                  <li>Contains viruses, malware, or other harmful code</li>
                  <li>Is spam, unsolicited mass messaging, or promotes fraudulent schemes</li>
                  <li>Impersonates any person or entity or misrepresents your affiliation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  The service and its original content, features, and functionality are owned by Linkly 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property or proprietary rights laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Disclaimer</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your use of the service is at your sole risk. The service is provided on an &quot;AS IS&quot; and 
                  &quot;AS AVAILABLE&quot; basis. The service is provided without warranties of any kind, whether 
                  express or implied, including, but not limited to, implied warranties of merchantability, 
                  fitness for a particular purpose, non-infringement or course of performance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  In no event shall Linkly, nor its directors, employees, partners, agents, suppliers, or 
                  affiliates, be liable for any indirect, incidental, special, consequential or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of your 
                  jurisdiction, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any 
                  time. We will provide notice of any changes by posting the new Terms on this page and 
                  updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:legal@linkly.to" className="text-blue-600 hover:underline">
                    legal@linkly.to
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

