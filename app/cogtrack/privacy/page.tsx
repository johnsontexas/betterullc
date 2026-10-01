import { LegalPage, LegalSection, LegalSubSection, LegalList } from "@/components/legal-page";

export const metadata = {
  title: "CogTrack Privacy Policy - BetterU LLC",
  description: "Privacy Policy for the CogTrack app by BetterU LLC",
};

export default function CogTrackPrivacyPage() {
  return (
    <LegalPage
      title="CogTrack Privacy Policy"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/cogtrack", label: "Back to CogTrack" }}
    >
      <p>
        CogTrack (&quot;the App&quot;) is owned and operated by BetterU LLC. This Privacy Policy
        explains what CogTrack collects, why, and what you can do about it.
      </p>
      <p>
        CogTrack is a self-monitoring tool. It is <strong className="text-foreground">not a medical
        device</strong>, and the information it stores is not a medical record. See section 3 below.
      </p>

      <LegalSection title="1. Information We Collect">
        <p>
          An account is required to use CogTrack. Everything below is tied to that account and is
          visible only to you.
        </p>

        <LegalSubSection title="Account Information">
          <LegalList
            items={[
              "A user ID and email address, provided when you sign in with Apple",
              "Your name, as you enter it",
              "Your age, used only to compare your scores against typical ranges for your age group",
              "The reason you told us you're using CogTrack",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Check-ins and Test Results">
          <LegalList
            items={[
              "Hours of sleep and mood, from the daily check-in",
              "Results of the cognitive tests you take — reaction time, go/no-go, n-back, Stroop and sustained attention — including per-trial timing",
              "The dates you completed sessions, which produce your streak and your trend charts",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Settings and Records">
          <LegalList
            items={[
              "Reminder preferences: whether notifications are on, how often, and the hour you chose",
              "Which version of the Terms of Service you accepted, and when",
            ]}
          />
        </LegalSubSection>

        <p>
          CogTrack does not read your Apple Health data, your contacts, your location, your camera
          or your microphone.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <p>We use what CogTrack collects to:</p>
        <LegalList
          items={[
            "Show you your own results, streak and trends over time",
            "Compare your scores against general reference ranges for your age group",
            "Sync your history across your devices so it isn't lost when you change phones",
            "Send the reminders you asked for, at the time you chose",
            "Keep the app working, and fix it when it doesn't",
          ]}
        />
        <p>
          We do not use your results to advertise to you, and we do not sell them. CogTrack shows
          no third-party ads.
        </p>
      </LegalSection>

      <LegalSection title="3. CogTrack Is Not a Medical Device">
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
          Because CogTrack is not a clinical service, the data it holds is not covered by HIPAA or
          equivalent medical-records rules. Please keep that in mind when deciding what to record.
        </p>
      </LegalSection>

      <LegalSection title="4. Data Storage and Security">
        <p>
          Your account, check-ins, results and settings are stored in our database, hosted by
          Supabase. Access is restricted at the database level so that each account can read and
          write only its own rows.
        </p>
        <p>
          We take reasonable measures to protect your information using industry-standard security
          practices. No system can be guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection title="5. Sharing of Information">
        <p>We do not sell personal information to third parties.</p>
        <p>Information may be shared only in the following cases:</p>
        <LegalList
          items={[
            "With service providers that help operate the app — Supabase for our database and authentication, Apple for sign-in, push notifications and any in-app purchases",
            "If required by law or legal process",
            "To protect the safety, rights, or property of users or the service",
          ]}
        />
        <p>
          Your test results are never shown to other users. CogTrack has no social features, no
          public profiles and no shared leaderboards tied to your measured trends.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Retention and Deletion">
        <p>
          Your data is kept for as long as your account exists. You can permanently delete your
          account and everything associated with it at any time from Settings inside the app. That
          deletion is immediate and cannot be undone.
        </p>
        <p>
          If you would rather have us do it, email the support address below from the address on
          your account.
        </p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>
          CogTrack is not intended for children under the age of 13. We do not knowingly collect
          personal information from children under 13. If such information is discovered, it will be
          deleted promptly.
        </p>
      </LegalSection>

      <LegalSection title="8. User Rights">
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

      <LegalSection title="9. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When updates occur, the
          &quot;Effective Date&quot; will be revised. Continued use of the app after changes
          indicates acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact Us">
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
