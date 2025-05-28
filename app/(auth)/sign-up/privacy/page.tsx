
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen ">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif text-base">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-md font-semibold text-gray-600">Effective {today}</p>
          <a
            href="#"
            className="text-sm font-semibold text-black underline mt-1 inline-block"
          >
            Previous Version
          </a>
        </div>

        <Separator className="my-6" />

        <div className="prose prose-neutral max-w-none space-y-8">
          <p>
            <strong>Your privacy is important to us.</strong> This Privacy Policy explains how
            <strong> Neuronote </strong> collects, uses, shares, and protects your personal information.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">1. <strong>What We Collect</strong></h2>
            <p><strong>a. Information You Provide:</strong></p>
            <ul>
              <li>Email address, password, and profile data</li>
              <li>Custom memory entries: title, description</li>
              <li>URLs and notes</li>
              <li>Feedback and messages sent to support</li>
            </ul>
            <p><strong>b. Automatically Collected:</strong></p>
            <ul>
              <li>Device type, browser, and IP address</li>
              <li>Usage logs (e.g., time spent, buttons clicked)</li>
              <li>Cookies or session storage (for login/session handling)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">2. <strong>How We Use Your Information</strong></h2>
            <ul>
              <li>Provide, operate, and maintain the Services</li>
              <li>Store and retrieve your memories using semantic vector search</li>
              <li>Communicate with you about updates, features, or support</li>
              <li>Analyze usage for performance monitoring and abuse prevention</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">3. <strong>How Your Memories Work</strong></h2>
            <p>
              Your memory entries (title + description) are stored using a <code>||</code> separator.
              Vector representations are generated to enable semantic search and match similar queries.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">4. <strong>Sharing of Personal Data</strong></h2>
            <p><strong>We do not sell or rent your personal data.</strong> We only share it with:</p>
            <ul>
              <li>Trusted service providers (e.g., Supabase, vector DB hosts)</li>
              <li>Legal authorities when required to comply with applicable laws</li>
              <li>You, for exporting or managing your own data</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">5. <strong>Your Rights and Choices</strong></h2>
            <ul>
              <li>Right to access, update, or delete your personal data</li>
              <li>Right to export your memories in a portable format</li>
              <li>Right to request full account deletion</li>
              <li>Right to withdraw consent where applicable</li>
            </ul>
            <p>To exercise your rights, email us at <a className="break-words" href="mailto:privacy@memoryapp.com">privacy@memoryapp.com</a>.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">6. <strong>Data Retention</strong></h2>
            <ul>
              <li>Data is retained while your account remains active</li>
              <li>Deleted memories are permanently purged within 30 days</li>
              <li>Some log data may be retained for analytics and security</li>
            </ul>
          </div>

        <div className="space-y-4">
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. We&apos;ll notify you of major updates.
            Continued use after changes implies consent to the new policy.
          </p>
        </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">8. <strong>Cookies and Similar Technologies</strong></h2>
            <p>
              We use cookies and session storage to maintain login state and enhance user experience.
              You may disable cookies in your browser, but doing so may affect functionality.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">9. <strong>Children’s Privacy</strong></h2>
            <p>
              The Services are not intended for users under the age of 18. We do not knowingly collect data from minors.
              If you believe a child has submitted personal data, contact us and we will delete it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">10. <strong>International Data Transfers</strong></h2>
            <p>
              Your data may be processed in countries outside your jurisdiction. We ensure appropriate safeguards to protect
              your information in accordance with applicable data protection laws.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">11. <strong>Changes to This Policy</strong></h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of major updates. Continued use of the
              Services after changes implies your consent to the revised policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">12. <strong>Contact Us</strong></h2>
            <p>
              If you have questions, concerns, or would like to exercise your rights, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> <a className="break-words" href="mailto:privacy@memoryapp.com">privacy@memoryapp.com</a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
