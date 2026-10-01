import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";
import Link from "next/link";

export const metadata = {
  title: "FrameGuide Terms of Service - BetterU LLC",
  description: "Terms of Service for the FrameGuide app by BetterU LLC",
};

export default function FrameGuideTermsPage() {
  return (
    <LegalPage
      title="FrameGuide Terms of Service"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/frameguide", label: "Back to FrameGuide" }}
    >
      <p>
        Welcome to FrameGuide, a mobile application operated by BetterU LLC. By accessing or using
        FrameGuide, you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree to
        these Terms, you should not use the app.
      </p>

      <LegalSection title="1. Use of the Service">
        <p>
          FrameGuide is a framing coach for your camera. It suggests compositions in the viewfinder,
          including in AR, and keeps your shots in its own album until you save them to Photos.
        </p>
        <p>By using FrameGuide, you agree to:</p>
        <LegalList
          items={[
            "Use the app only for lawful purposes",
            "Respect the privacy and rights of people you photograph",
            "Follow all applicable laws and regulations, including where photography is restricted",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          Signing in is optional and is done with your Apple ID. It exists to keep FrameGuide Pro
          and your weekly allowance in sync across your devices.
        </p>
        <p>
          You are responsible for activity under your account. Deleting your account does not cancel
          a subscription — see section 5.
        </p>
      </LegalSection>

      <LegalSection title="3. Your Photos">
        <p>
          You own your photos. We do not claim any ownership of them.
        </p>
        <p>
          You grant BetterU LLC a limited licence to process your images only to deliver the feature
          you asked for. Shots are stored on your device, not in our cloud. When you use an AI
          feature, a downscaled copy of the frame is sent to our AI provider to generate the
          suggestion, as described in the{" "}
          <Link href="/frameguide/privacy" className="text-primary hover:underline">
            FrameGuide Privacy Policy
          </Link>
          .
        </p>
        <p>
          You confirm you have the right to photograph and submit the content you send through the
          app.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable Use">
        <p>You agree not to use FrameGuide to:</p>
        <LegalList
          items={[
            "Photograph people without the consent required where you are",
            "Create or submit unlawful, harassing, abusive or sexually exploitative content",
            "Attempt to access other users' data or our systems without authorisation",
            "Disrupt, overload or reverse engineer the service",
            "Evade the watermark, allowance or entitlement rules described below",
          ]}
        />
        <p>
          We may suspend or terminate accounts that violate these Terms.
        </p>
      </LegalSection>

      <LegalSection title="5. FrameGuide Pro, Ads and Watermarks">
        <p>
          On-device coaching is free. The AI features, clean exports and ad removal are governed by
          the following:
        </p>
        <LegalList
          items={[
            "Free Compose and AR exports may include a FrameGuide watermark unless unlocked",
            "A clean save can be unlocked with your weekly free allowance, by watching a rewarded ad, or with FrameGuide Pro",
            "FrameGuide Pro removes ads and the watermark, and lifts the AR allowance",
            "Free-tier use may show advertising, including rewarded ads",
          ]}
        />
        <p>Subscriptions are sold through Apple In-App Purchase:</p>
        <LegalList
          items={[
            "Subscriptions renew automatically unless cancelled at least 24 hours before the period ends",
            "You manage and cancel subscriptions in your Apple account settings",
            "Refunds are handled by Apple under its own policies",
            "Prices and allowances may change; changes apply from your next billing period",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. AI Suggestions">
        <p>
          Framing suggestions are generated automatically and are offered as guidance, not as a
          guarantee of a good photograph. They may be wrong, unhelpful, or unsuitable for your
          scene. You decide what to shoot and what to keep.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <p>
          FrameGuide depends on Apple, Supabase, OpenAI, RevenueCat and Google AdMob. Your use of
          the app is also subject to their respective terms, and we are not responsible for their
          services.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          You may stop using FrameGuide at any time and delete your account from the Profile screen.
          Deleting the app also deletes its on-device album, so save anything you want to keep to
          Photos first.
        </p>
        <p>
          We may suspend or terminate access if these Terms are violated, or if required to protect
          the service or its users.
        </p>
      </LegalSection>

      <LegalSection title="9. Disclaimer of Warranties">
        <p>
          FrameGuide is provided &quot;as is&quot; and &quot;as available,&quot; without warranties
          of any kind, express or implied.
        </p>
        <p>We do not guarantee that:</p>
        <LegalList
          items={[
            "The app will be uninterrupted or error-free",
            "AR tracking or framing suggestions will be accurate in any given scene",
            "Photos held in the app's album will survive device loss, app deletion or OS changes",
          ]}
        />
        <p>
          Save anything you care about to Photos. The in-app album is a staging area, not a backup.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, BetterU LLC is not liable for any indirect,
          incidental, or consequential damages arising from your use of the app, including lost
          photographs or missed shots.
        </p>
        <p>
          Where liability cannot be excluded, it is limited to the greater of the amount you paid
          for FrameGuide Pro in the twelve months before the claim, or $50 USD.
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
          We may update these Terms from time to time. When updates occur, the &quot;Effective
          Date&quot; will be revised. Continued use of the app after changes indicates acceptance of
          the updated Terms.
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
