import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif text-base">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-md font-semibold text-gray-600 dark:text-gray-400">
            Effective {today}
          </p>
        </div>

        <Separator className="my-6" />

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p>
            Welcome to <strong>MemoryApp</strong>. These Terms of Service
            (&quot;Terms&quot;) govern your use of our products, services, and
            associated applications (&quot;Services&quot;). By using our
            Services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">1. Who We Are</h2>
          <p>
            MemoryApp is a digital platform that allows users to create, store,
            and retrieve memory entries using semantic search and related
            features. Our mission is to make your personal knowledge and moments
            easily searchable and safe.
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            2. Account Creation
          </h2>
          <ul>
            <li>You must be at least 18 years old to create an account.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>
              You must keep your login credentials secure and confidential.
            </li>
            <li>
              You may close your account at any time by contacting support.
            </li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            3. Use of Our Services
          </h2>
          <p>
            You agree to use MemoryApp in accordance with these terms, and not
            to:
          </p>
          <ul>
            <li>Violate any laws or regulations.</li>
            <li>Use the Services for any unlawful or harmful purposes.</li>
            <li>Reverse-engineer or attempt to extract source code.</li>
            <li>Interfere with or disrupt the Service or servers.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            4. Content and Data
          </h2>
          <ul>
            <li>You retain ownership of the content you submit.</li>
            <li>
              We process your content to provide the Services, including
              storing, retrieving, and searching memories.
            </li>
            <li>
              We do not use your personal content to train our models without
              explicit consent.
            </li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            5. Subscriptions and Payments
          </h2>
          <ul>
            <li>
              Certain features may require a subscription or one-time payment.
            </li>
            <li>
              All payments are final and non-refundable, unless required by law.
            </li>
            <li>We reserve the right to change pricing with prior notice.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-semibold">6. Termination</h2>
          <ul>
            <li>
              We may suspend or terminate your access for violations of these
              Terms.
            </li>
            <li>You may delete your account at any time.</li>
            <li>
              Upon termination, your data will be deleted as per our retention
              policy.
            </li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            7. Disclaimer and Limitation of Liability
          </h2>
          <p>
            MemoryApp is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any indirect or consequential damages
            arising from your use of the Services.
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            8. Changes to These Terms
          </h2>
          <p>
            We may update these Terms periodically. Continued use of the
            Services after such updates constitutes acceptance of the revised
            Terms.
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">9. Contact Us</h2>
          <p>
            For any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:support@memoryapp.com" className="break-words">
              support@memoryapp.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}