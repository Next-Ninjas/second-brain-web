
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
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
          Your privacy is important to us. This Privacy Policy explains how
          <strong> MemoryApp </strong> collects, uses, shares, and protects your personal information.
        </p>

        <div className="space-y-4">
          <h2>1. What We Collect</h2>
          <h3>a. Information You Provide:</h3>
          <ul>
            <li>Email address, password, and profile data</li>
            <li>Custom memory entries: title, description</li>
            <li>URLs and notes</li>
            <li>Feedback and messages sent to support</li>
          </ul>
          <h3>b. Automatically Collected:</h3>
          <ul>
            <li>Device type, browser, and IP address</li>
            <li>Usage logs (e.g., time spent, buttons clicked)</li>
            <li>Cookies or session storage (for login/session handling)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide, maintain, and improve the Services</li>
            <li>Store and search your memories using vector similarity</li>
            <li>Communicate with you about updates or support</li>
            <li>Monitor usage for performance and abuse prevention</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>3. How Memories Work</h2>
          <p>
            Your memory inputs are processed (title + description) and stored with a <code>||</code> separator.
            Vector representations are stored for matching similar queries via semantic search.
          </p>
        </div>

        <div className="space-y-4">
          <h2>4. Sharing of Data</h2>
          <p>We do not sell or rent your personal information. We only share it with:</p>
          <ul>
            <li>Service providers (e.g., Supabase, vector DB hosts)</li>
            <li>Legal authorities when required</li>
            <li>You, when exporting or managing your own data</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>5. Your Rights</h2>
          <ul>
            <li>Access, update, or delete your account and memories</li>
            <li>Export your data</li>
            <li>Request full account deletion via support</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>6. Data Retention</h2>
          <ul>
            <li>We retain data while your account is active</li>
            <li>Deleted memories are purged within 30 days</li>
            <li>Log data may be retained for analytics and security purposes</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2>7. Security</h2>
          <p>
            We use encryption, access controls, and secure infrastructure to protect your data.
          </p>
        </div>

        <div className="space-y-4">
          <h2>8. Cookies</h2>
          <p>
            We use cookies or session storage only to manage your login and improve user experience.
            You may disable cookies in your browser, but this could affect functionality.
          </p>
        </div>

        <div className="space-y-4">
          <h2>9. Children</h2>
          <p>
            The Services are not intended for users under the age of 18. We do not knowingly collect data from minors.
          </p>
        </div>

        <div className="space-y-4">
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. We'll notify you of major updates.
            Continued use after changes implies consent to the new policy.
          </p>
        </div>

        <div className="space-y-4">
          <h2>11. Contact</h2>
          <p>
            For any privacy questions, reach out at:{" "}
            <a href="mailto:privacy@memoryapp.com">privacy@memoryapp.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
