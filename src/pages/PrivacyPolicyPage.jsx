import React from 'react';
import { SEO } from '../components/common/SEO';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <SEO 
        title="Privacy Policy"
        description="Privacy policy and data protection terms for ByteByteTech. Learn how we securely protect and handle your roadmap progress data."
        keywords="privacy policy, data security, data deletion, bytebytetech privacy"
      />
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-surface py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main">
            Privacy Policy
          </h1>
          <p className="mt-3 text-text-muted text-sm font-medium">
            Last updated: May 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="space-y-8 text-[15px] leading-relaxed text-text-muted">

          {/* Intro */}
          <div className="space-y-4">
            <p className="font-medium text-slate-700">
              <strong className="text-text-main font-bold">ByteByteTech</strong> (bytebytetech.com) is a solo project for real-world tech learning and system architecture preparation, created and maintained by one person. This policy explains what data is collected, why, and how it is handled.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text-main tracking-tight">
              1. What data we collect
            </h2>
            <p>We only collect data necessary to run the platform:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-text-main font-semibold">Account data</strong> — Email address, name, and profile picture — provided during registration or via external authentication services.
              </li>
              <li>
                <strong className="text-text-main font-semibold">Password</strong> — If you register with email, your password is stored as a cryptographic hash. Plaintext passwords are never stored.
              </li>
              <li>
                <strong className="text-text-main font-semibold">Usage data</strong> — Information about your progress (such as completed roadmap modules) and content you interact with, necessary for the platform's features to work.
              </li>
              <li>
                <strong className="text-text-main font-semibold">Technical data</strong> — Tokens and cookies required to maintain your login session.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text-main tracking-tight">
              2. Analytics
            </h2>
            <p>
              We use analytics tools to understand how the platform is used. This data helps us improve the service, optimize real-world concept guides, and enhance user experience. No personal data is ever sold or shared with advertisers.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text-main tracking-tight">
              3. Third-party services
            </h2>
            <p>
              Your data is processed on secure infrastructure provided by cloud hosting, database, and authentication service providers. All voluntary support contributions are handled through external secure payment platforms — ByteByteTech does not collect or store your card, bank, or wallet details.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text-main tracking-tight">
              4. Your rights and data retention
            </h2>
            <p>Your data is stored as long as your account exists. You can at any time:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request correction or export of your data.</li>
              <li>Fully delete your account and all associated progress data.</li>
            </ul>
            <p>
              To exercise these rights, you can email us at <a href="mailto:contact@bytebytetech.com" className="text-blue-600 hover:underline font-semibold">contact@bytebytetech.com</a>. Requests are processed within 7 days.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text-main tracking-tight">
              5. Changes to this policy
            </h2>
            <p>
              This policy may be updated as the platform evolves. The current revision date is always shown at the top of this page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
