import { LegalPage, LegalSection, LegalSubSection, LegalList } from "@/components/legal-page";

export const metadata = {
  title: "Snapshot Privacy Policy - BetterU LLC",
  description: "Privacy Policy for the Snapshot app by BetterU LLC",
};

export default function SnapshotPrivacyPage() {
  return (
    <LegalPage
      title="Snapshot Privacy Policy"
      effectiveDate="March 14, 2026"
      backLink={{ href: "/snapshot", label: "Back to Snapshot" }}
    >
      <p>
        Snapshot (&quot;the App&quot;) is owned and operated by BetterU LLC. This Privacy Policy explains
        how we collect, use, and protect your information when you use Snapshot.
      </p>

      <LegalSection title="1. Information We Collect">
        <p>When you use Snapshot, we may collect the following information:</p>

        <LegalSubSection title="Account Information">
          <LegalList
            items={[
              "Username",
              "Email address",
              "Profile information you choose to provide",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="User Content">
          <LegalList
            items={[
              "Photos submitted within the app",
              "Game activity (missions, submissions, group participation)",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Device & Usage Data">
          <LegalList
            items={[
              "Device type and operating system",
              "App usage statistics",
              "Log data such as IP address and timestamps",
            ]}
          />
        </LegalSubSection>

        <p>This information helps us operate and improve the app.</p>
      </LegalSection>

      <LegalSection title="2. Photos and User Submissions">
        <p>
          Snapshot allows users to submit photos as part of gameplay. By uploading content you
          acknowledge that:
        </p>
        <LegalList
          items={[
            "Photos may be shared with members of your game group",
            "Users should only upload photos they have permission to share",
            "Snapshot does not claim ownership of your photos, but we may store them to operate the service",
          ]}
        />
        <p>
          Users are responsible for ensuring uploaded content does not violate privacy or laws.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use collected information to:</p>
        <LegalList
          items={[
            "Provide and maintain the app",
            "Enable gameplay features",
            "Improve app performance and user experience",
            "Prevent abuse or misuse of the platform",
            "Communicate important updates or support responses",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Data Storage and Security">
        <p>
          We take reasonable measures to protect your information using industry-standard security
          practices. However, no system can be guaranteed to be completely secure.
        </p>
        <p>User content and data may be stored on secure cloud infrastructure.</p>
      </LegalSection>

      <LegalSection title="5. Sharing of Information">
        <p>We do not sell personal information to third parties.</p>
        <p>Information may be shared only in the following cases:</p>
        <LegalList
          items={[
            "With service providers that help operate the app (such as cloud hosting)",
            "If required by law or legal process",
            "To protect the safety, rights, or property of users or the service",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Children's Privacy">
        <p>
          Snapshot is not intended for children under the age of 13. We do not knowingly collect
          personal information from children under 13. If such information is discovered, it will be
          deleted promptly.
        </p>
      </LegalSection>

      <LegalSection title="7. User Rights">
        <p>Users may request to:</p>
        <LegalList
          items={[
            "Access their stored data",
            "Delete their account and associated data",
            "Request correction of inaccurate information",
          ]}
        />
        <p>Requests can be sent to the support email below.</p>
      </LegalSection>

      <LegalSection title="8. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When updates occur, the
          &quot;Effective Date&quot; will be revised. Continued use of the app after changes indicates
          acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>If you have questions about this Privacy Policy or the app, please contact:</p>
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
