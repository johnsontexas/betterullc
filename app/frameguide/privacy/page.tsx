import { LegalPage, LegalSection, LegalSubSection, LegalList } from "@/components/legal-page";

export const metadata = {
  title: "FrameGuide Privacy Policy - BetterU LLC",
  description: "Privacy Policy for the FrameGuide app by BetterU LLC",
};

export default function FrameGuidePrivacyPage() {
  return (
    <LegalPage
      title="FrameGuide Privacy Policy"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/frameguide", label: "Back to FrameGuide" }}
    >
      <p>
        FrameGuide (&quot;the App&quot;, bundle ID <code>com.enriqueortiz.frameguide</code>) is
        owned and operated by BetterU LLC. This Privacy Policy explains what FrameGuide collects,
        what stays on your device, and what leaves it.
      </p>
      <p>
        The short version: your photos stay on your phone. The only images that leave it are the
        ones you send to an AI feature yourself, and those go downscaled.
      </p>

      <LegalSection title="1. Information We Collect">
        <LegalSubSection title="Account Information">
          <p>
            If you sign in, you use Sign in with Apple, handled through Supabase. We receive a user
            ID and an email address — which is an Apple private relay address if you chose to hide
            your email. We never see your Apple password.
          </p>
          <p>
            Signing in is optional. It exists so FrameGuide Pro and your weekly free allowance
            follow you across devices.
          </p>
        </LegalSubSection>

        <LegalSubSection title="Photos and Camera">
          <LegalList
            items={[
              "Camera access is used to run the viewfinder and the AR framing guides",
              "Shots you take are written to FrameGuide's own on-device album, not to your camera roll",
              "Nothing reaches your Photos library until you explicitly save it",
              "We do not upload, back up or retain your album",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="Purchases and Ads">
          <LegalList
            items={[
              "Subscription status is managed through Apple and RevenueCat; we see whether Pro is active, not your payment details",
              "On the free tier, Google AdMob serves ads, including the optional rewarded ads that unlock a clean save",
            ]}
          />
        </LegalSubSection>

        <p>
          FrameGuide does not collect your contacts, your location, or your microphone.
        </p>
      </LegalSection>

      <LegalSection title="2. AI Features and What Leaves Your Device">
        <p>
          The on-device coaching — grids, thirds and live framing guidance — runs entirely on your
          phone and sends nothing anywhere.
        </p>
        <p>
          When you choose to use an AI feature (Compose or AR Suggest), FrameGuide sends a
          compressed, downscaled JPEG of the current frame plus a short prompt and scene context to
          OpenAI, which returns the suggestion. That request is made only when you ask for it.
        </p>
        <p>
          Do not send images through the AI features that you would not be comfortable transmitting
          to a third-party processor, and do not send images you do not have the right to share.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use what FrameGuide collects to:</p>
        <LegalList
          items={[
            "Keep your Pro status and weekly free allowance in sync across your devices",
            "Return the framing suggestion you asked for",
            "Apply or remove the export watermark according to your entitlement",
            "Serve ads on the free tier",
            "Keep the app working, and fix it when it doesn't",
          ]}
        />
        <p>We do not sell personal information, and we do not sell or train on your photos.</p>
      </LegalSection>

      <LegalSection title="4. Third-Party Services">
        <p>
          FrameGuide relies on the following services, each of which handles data under its own
          privacy policy:
        </p>
        <LegalList
          items={[
            "Apple — Sign in with Apple, App Store payments",
            "Supabase — authentication and account records",
            "OpenAI — processes the images and prompts sent by the Compose and AR Suggest features",
            "RevenueCat — subscription entitlement management",
            "Google AdMob — advertising on the free tier",
          ]}
        />
        <p>
          AdMob may use a device advertising identifier. On iOS this is governed by Apple&apos;s App
          Tracking Transparency permission, which you can change at any time in your device
          settings.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Storage and Security">
        <p>
          Account records are stored in our Supabase project. Your photos are stored on your own
          device, in the app&apos;s private storage, and are removed when you delete them or remove
          the app.
        </p>
        <p>
          We take reasonable measures to protect your information using industry-standard security
          practices. No system can be guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Retention and Deletion">
        <p>
          Account data is kept while your account exists. You can delete your account from the
          Profile screen inside the app.
        </p>
        <p>
          Deleting your account does not cancel Apple billing — cancel an active subscription in
          your Apple account settings. Deleting the app removes the on-device album with it, so save
          anything you want to keep to Photos first.
        </p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>
          FrameGuide is not intended for children under the age of 13. We do not knowingly collect
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
