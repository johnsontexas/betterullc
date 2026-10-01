import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";
import Link from "next/link";

export const metadata = {
  title: "Snapshot Terms of Service - BetterU LLC",
  description: "Terms of Service for the Snapshot app by BetterU LLC",
};

export default function SnapshotTermsPage() {
  return (
    <LegalPage
      title="Snapshot Terms of Service"
      effectiveDate="March 14, 2026"
      backLink={{ href: "/snapshot", label: "Back to Snapshot" }}
    >
      <p>
        Welcome to Snapshot, a mobile application operated by BetterU LLC. By accessing or using
        Snapshot, you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree to these
        Terms, you should not use the app.
      </p>

      <LegalSection title="1. Use of the Service">
        <p>
          Snapshot is a social game that allows users to participate in challenges, submit photos,
          and interact with other users.
        </p>
        <p>By using Snapshot, you agree to:</p>
        <LegalList
          items={[
            "Use the app only for lawful purposes",
            "Respect the privacy and rights of others",
            "Follow all applicable laws and regulations",
          ]}
        />
        <p>
          BetterU LLC reserves the right to suspend or terminate accounts that violate these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. User Accounts">
        <p>
          To use certain features of Snapshot, you may be required to create an account.
        </p>
        <p>You agree that:</p>
        <LegalList
          items={[
            "The information you provide is accurate and truthful",
            "You are responsible for maintaining the security of your account",
            "You are responsible for activity that occurs under your account",
          ]}
        />
        <p>
          We may suspend or terminate accounts that are used fraudulently or in violation of these
          Terms.
        </p>
      </LegalSection>

      <LegalSection title="3. User Content">
        <p>Snapshot allows users to upload photos and other content.</p>
        <p>By submitting content to the app:</p>
        <LegalList
          items={[
            "You confirm that you have the right to share the content",
            "You grant Snapshot a non-exclusive, worldwide license to store and display that content for the purpose of operating the service",
            "You remain the owner of your content",
          ]}
        />
        <p>Users are responsible for the content they upload.</p>
      </LegalSection>

      <LegalSection title="4. Prohibited Content">
        <p>Users may not upload or share content that:</p>
        <LegalList
          items={[
            "Violates the privacy of another person",
            "Contains harassment, bullying, or threats",
            "Contains explicit, sexual, or illegal material",
            "Promotes violence or illegal activities",
            "Infringes on copyrights or intellectual property",
          ]}
        />
        <p>
          BetterU LLC may remove content or suspend accounts that violate these rules.
        </p>
      </LegalSection>

      <LegalSection title="5. Privacy">
        <p>
          Your use of Snapshot is also governed by our{" "}
          <Link href="/snapshot/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          , which explains how we collect and use information.
        </p>
      </LegalSection>

      <LegalSection title="6. Termination">
        <p>We reserve the right to:</p>
        <LegalList
          items={[
            "Suspend or terminate accounts",
            "Remove content that violates our policies",
            "Restrict access to the app at our discretion",
          ]}
        />
        <p>Users may stop using the app at any time.</p>
      </LegalSection>

      <LegalSection title="7. Disclaimer of Warranties">
        <p>Snapshot is provided &quot;as is&quot; and &quot;as available.&quot;</p>
        <p>BetterU LLC makes no guarantees that:</p>
        <LegalList
          items={[
            "The app will always be available",
            "The app will be free from errors or interruptions",
            "Content shared by users will be accurate or appropriate",
          ]}
        />
        <p>Use of the app is at your own risk.</p>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, BetterU LLC shall not be liable for any damages
          arising from:
        </p>
        <LegalList
          items={[
            "Use or inability to use the app",
            "User-generated content",
            "Interactions between users",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Changes to the Terms">
        <p>
          We may update these Terms from time to time. Continued use of the app after updates
          indicates acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact Information">
        <p>If you have questions about these Terms, contact:</p>
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
