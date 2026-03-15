import { LegalPage, LegalSection, LegalSubSection, LegalList } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy - BetterU LLC",
  description: "Privacy Policy for BetterU LLC and BetterU Social Fitness",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="March 14, 2026"
      backLink={{ href: "/", label: "Back to Home" }}
    >
      <p>
        BetterU LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and protect your information when you use our
        applications and services.
      </p>

      <LegalSection title="1. Information We Collect">
        <p>When you use our services, we may collect the following information:</p>

        <LegalSubSection title="Account Information">
          <LegalList
            items={[
              "Name and username",
              "Email address",
              "Profile information you choose to provide",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Usage Data">
          <LegalList
            items={[
              "App usage patterns and preferences",
              "Fitness and workout data (for BetterU Social Fitness)",
              "Interaction data with other users",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Device Information">
          <LegalList
            items={[
              "Device type and operating system",
              "App version",
              "Log data such as IP address and timestamps",
            ]}
          />
        </LegalSubSection>

        <p>This information helps us operate and improve our services.</p>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <p>We use collected information to:</p>
        <LegalList
          items={[
            "Provide and maintain our services",
            "Enable social features and connectivity",
            "Improve app performance and user experience",
            "Send important updates and communications",
            "Prevent abuse or misuse of the platform",
            "Analyze usage patterns to improve our products",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Data Storage and Security">
        <p>
          We take reasonable measures to protect your information using industry-standard security
          practices. However, no system can be guaranteed to be completely secure.
        </p>
        <p>User data may be stored on secure cloud infrastructure.</p>
      </LegalSection>

      <LegalSection title="4. Sharing of Information">
        <p>We do not sell personal information to third parties.</p>
        <p>Information may be shared only in the following cases:</p>
        <LegalList
          items={[
            "With other users as part of social features (e.g., friends, groups)",
            "With service providers that help operate our services (such as cloud hosting)",
            "If required by law or legal process",
            "To protect the safety, rights, or property of users or the service",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Children's Privacy">
        <p>
          Our services are not intended for children under the age of 13. We do not knowingly
          collect personal information from children under 13. If such information is discovered, it
          will be deleted promptly.
        </p>
      </LegalSection>

      <LegalSection title="6. User Rights">
        <p>You may request to:</p>
        <LegalList
          items={[
            "Access your stored data",
            "Delete your account and associated data",
            "Request correction of inaccurate information",
            "Opt out of certain data collection practices",
          ]}
        />
        <p>Requests can be sent to the support email below.</p>
      </LegalSection>

      <LegalSection title="7. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When updates occur, the
          &quot;Effective Date&quot; will be revised. Continued use of our services after changes indicates
          acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>If you have questions about this Privacy Policy, please contact:</p>
        <p>
          BetterU LLC
          <br />
          Support Email:{" "}
          <a href="mailto:app@betterullc.com" className="text-primary hover:underline">
            app@betterullc.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
