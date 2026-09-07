import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - BetterU LLC",
  description: "Terms of Service for BetterU LLC applications and services",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="March 14, 2026"
      backLink={{ href: "/", label: "Back to Home" }}
    >
      <p>
        Welcome to BetterU LLC. By accessing or using our applications and services, you agree to
        these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you should not use
        our services.
      </p>

      <LegalSection title="1. Use of Services">
        <p>
          BetterU LLC provides various mobile applications and services designed to enhance social
          connections and personal improvement.
        </p>
        <p>By using our services, you agree to:</p>
        <LegalList
          items={[
            "Use the services only for lawful purposes",
            "Respect the privacy and rights of other users",
            "Follow all applicable laws and regulations",
            "Not attempt to interfere with or disrupt our services",
          ]}
        />
        <p>
          BetterU LLC reserves the right to suspend or terminate accounts that violate these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. User Accounts">
        <p>To use certain features of our services, you may be required to create an account.</p>
        <p>You agree that:</p>
        <LegalList
          items={[
            "The information you provide is accurate and truthful",
            "You are responsible for maintaining the security of your account",
            "You are responsible for activity that occurs under your account",
            "You will notify us immediately of any unauthorized access",
          ]}
        />
        <p>
          We may suspend or terminate accounts that are used fraudulently or in violation of these
          Terms.
        </p>
      </LegalSection>

      <LegalSection title="3. User Content">
        <p>Our services may allow you to upload, submit, or share content.</p>
        <p>By submitting content to our services:</p>
        <LegalList
          items={[
            "You confirm that you have the right to share the content",
            "You grant BetterU LLC a non-exclusive, worldwide license to store and display that content for the purpose of operating our services",
            "You remain the owner of your content",
          ]}
        />
        <p>Users are responsible for the content they upload.</p>
      </LegalSection>

      <LegalSection title="4. Prohibited Content and Behavior">
        <p>Users may not upload or share content that:</p>
        <LegalList
          items={[
            "Violates the privacy of another person",
            "Contains harassment, bullying, or threats",
            "Contains explicit, sexual, or illegal material",
            "Promotes violence or illegal activities",
            "Infringes on copyrights or intellectual property",
            "Contains spam or malicious software",
          ]}
        />
        <p>BetterU LLC may remove content or suspend accounts that violate these rules.</p>
      </LegalSection>

      <LegalSection title="5. Privacy">
        <p>
          Your use of our services is also governed by our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          , which explains how we collect and use information.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>
          BetterU LLC and our applications are protected by copyright, trademark, and other laws.
          You may not copy, modify, distribute, or reverse engineer any part of our services without
          our written permission.
        </p>
      </LegalSection>

      <LegalSection title="7. Termination">
        <p>We reserve the right to:</p>
        <LegalList
          items={[
            "Suspend or terminate accounts",
            "Remove content that violates our policies",
            "Restrict access to our services at our discretion",
            "Discontinue any service at any time",
          ]}
        />
        <p>Users may stop using our services at any time.</p>
      </LegalSection>

      <LegalSection title="8. Disclaimer of Warranties">
        <p>Our services are provided &quot;as is&quot; and &quot;as available.&quot;</p>
        <p>BetterU LLC makes no guarantees that:</p>
        <LegalList
          items={[
            "The services will always be available",
            "The services will be free from errors or interruptions",
            "Content shared by users will be accurate or appropriate",
            "The services will meet your specific requirements",
          ]}
        />
        <p>Use of our services is at your own risk.</p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, BetterU LLC shall not be liable for any damages
          arising from:
        </p>
        <LegalList
          items={[
            "Use or inability to use our services",
            "User-generated content",
            "Interactions between users",
            "Any third-party services or content",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Changes to the Terms">
        <p>
          We may update these Terms from time to time. Continued use of our services after updates
          indicates acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Information">
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
