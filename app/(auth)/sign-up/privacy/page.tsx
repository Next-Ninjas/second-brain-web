// app/privacy/page.tsx

import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">
          Privacy Policy
        </h1>
        <Separator />
        <div className="prose prose-gray max-w-none">
          <p>
            This Privacy Policy outlines how your data is collected, used, and
            protected by Second Brain.
          </p>

          <h2>1. Data Collection</h2>
          <p>
            We collect personal data such as your name, email, and memories you
            save within the platform.
          </p>

          <h2>2. Use of Data</h2>
          <p>
            Your data is used to personalize your experience and improve the
            memory assistant’s performance.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>
            We may integrate with services such as Pinecone and Mistral. Your
            data is processed according to their respective privacy practices.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We apply modern security practices including encryption, JWT
            authentication, and secure cookie handling to protect your data.
          </p>

          <h2>5. User Rights</h2>
          <p>
            You may access, export, or delete your data at any time. Please
            contact us to initiate any such request.
          </p>

          <h2>6. Contact</h2>
          <p>
            If you have questions or concerns, reach us at{" "}
            <a href="mailto:privacy@secondbrain.ai">privacy@secondbrain.ai</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
