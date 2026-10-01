import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";
import Link from "next/link";

export const metadata = {
  title: "CogTrack Terms of Service - BetterU LLC",
  description: "Terms of Service for the CogTrack app by BetterU LLC",
};

export default function CogTrackTermsPage() {
  return (
    <LegalPage
      title="CogTrack Terms of Service"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/cogtrack", label: "Back to CogTrack" }}
    >
      <p>
        Welcome to CogTrack, a mobile application operated by BetterU LLC. By accessing or using
        CogTrack, you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree to
        these Terms, you should not use the app.
      </p>

      <LegalSection title="1. What CogTrack Is">
        <p>
          CogTrack lets you run short cognitive tests — reaction time, go/no-go, n-back, Stroop and
          sustained attention — log a daily check-in, and track your results over time. It is a
          personal tracking tool, not a clinical or diagnostic instrument.
        </p>
      </LegalSection>

      <LegalSection title="2. Not Medical Advice">
        <p>
          CogTrack is a self-monitoring tool for tracking simple cognitive tests over time. It is
          not a medical device and does not diagnose, treat, or provide medical advice about any
          condition, including concussion, ADHD, or dementia.
        </p>
        <p>
          Results can be affected by sleep, stress, caffeine, practice effects, and your device.
          Trends, scores, and benchmark comparisons shown in the app are general reference
          information only. Always talk to a qualified healthcare professional about any health
          concerns instead of relying on this app alone.
        </p>
        <p>
          Do not use CogTrack to decide whether to seek, delay or stop medical care, and do not use
          it to make return-to-play, return-to-work or similar decisions after a head injury.
        </p>
      </LegalSection>

      <LegalSection title="3. User Accounts">
        <p>
          An account is required to use CogTrack. You create one by signing in with Apple.
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

      <LegalSection title="4. Your Data">
        <p>
          Your test results, check-ins, settings and profile are stored in our database so they sync
          across your sessions and devices. They belong to you.
        </p>
        <p>
          You can permanently delete your account and all associated data at any time from Settings
          inside the app. What we collect and how it is handled is described in the{" "}
          <Link href="/cogtrack/privacy" className="text-primary hover:underline">
            CogTrack Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable Use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Use the app for any unlawful purpose",
            "Attempt to disrupt, overload or interfere with the service",
            "Attempt to access other users' data or accounts",
            "Reverse engineer, scrape or resell the app or its test content",
            "Present results from the app as a clinical or diagnostic assessment of anyone",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Purchases and Subscriptions">
        <p>
          CogTrack may offer paid features. Any purchase is processed by Apple through your App
          Store account under Apple&apos;s terms, not by BetterU LLC directly.
        </p>
        <LegalList
          items={[
            "Subscriptions renew automatically unless cancelled at least 24 hours before the period ends",
            "You manage and cancel subscriptions in your Apple account settings",
            "Deleting your CogTrack account does not cancel an Apple subscription",
            "Refunds are handled by Apple under its own policies",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <p>
          The app, its name, design, and the implementation of its tests are the property of
          BetterU LLC. The underlying cognitive tasks are long-standing published paradigms and are
          not claimed as ours. You may not copy or redistribute the app or its content without
          permission.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          You may stop using CogTrack at any time and delete your account from Settings.
        </p>
        <p>
          We may suspend or terminate access if these Terms are violated, or if required to protect
          the service or its users.
        </p>
      </LegalSection>

      <LegalSection title="9. Disclaimer of Warranties">
        <p>
          CogTrack is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of
          any kind, express or implied.
        </p>
        <p>We do not guarantee that:</p>
        <LegalList
          items={[
            "The app will be uninterrupted or error-free",
            "Results, trends or benchmark comparisons will be accurate for any individual",
            "The app is suitable for any particular purpose, clinical or otherwise",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, BetterU LLC is not liable for any indirect,
          incidental, or consequential damages arising from your use of the app or from reliance on
          the information it presents.
        </p>
        <p>
          Where liability cannot be excluded, it is limited to the greater of the amount you paid
          for CogTrack in the twelve months before the claim, or $50 USD.
        </p>
      </LegalSection>

      <LegalSection title="11. Governing Law">
        <p>
          These Terms are governed by the laws of the State of Texas, United States, without regard
          to conflict-of-law rules. This does not remove any consumer protections you are entitled
          to under the mandatory law of the place you live.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to the Terms">
        <p>
          We may update these Terms as the app changes. When we do, the &quot;Effective Date&quot;
          above is revised, and you will be asked to review and accept the new version the next time
          you open the app before you can continue using it.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact Information">
        <p>For questions about these Terms, contact:</p>
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
