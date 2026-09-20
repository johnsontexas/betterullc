import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";
import Link from "next/link";

export const metadata = {
  title: "Terrarium Terms of Service - BetterU LLC",
  description: "Terms of Service for the Terrarium desktop app by BetterU LLC",
};

export default function TerrariumTermsPage() {
  return (
    <LegalPage
      title="Terrarium Terms of Service"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/Terrarium", label: "Back to Terrarium" }}
    >
      <p>
        Welcome to Terrarium, a desktop application for macOS and Windows operated by BetterU LLC.
        By downloading or using Terrarium, you agree to these Terms of Service (&quot;Terms&quot;).
        If you do not agree to these Terms, you should not use the app.
      </p>

      <LegalSection title="1. Use of the Service">
        <p>
          Terrarium is a desktop environment that hosts browser tabs, notes, timers, files and
          mini-apps on a single canvas, saved to your own machine.
        </p>
        <p>By using Terrarium, you agree to:</p>
        <LegalList
          items={[
            "Use the app only for lawful purposes",
            "Follow all applicable laws and regulations",
            "Respect the terms of any outside service you connect to it",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Pre-Release Software">
        <p>
          Terrarium is under active development and is distributed as pre-release software. It may
          change substantially, lose features, or fail in ways finished software should not.
        </p>
        <p>
          Keep your own backups of anything important. Do not rely on Terrarium as the only copy of
          work you cannot afford to lose.
        </p>
      </LegalSection>

      <LegalSection title="3. Your Content">
        <p>
          Your workspaces, notes and files are yours. They are stored on your computer, and we claim
          no ownership of them and no licence to them.
        </p>
        <p>
          If you enable sync or use the in-app assistant, limited data is transmitted to operate
          those features, as described in the{" "}
          <Link href="/Terrarium/privacy" className="text-primary hover:underline">
            Terrarium Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="4. Accounts and Connectors">
        <p>
          An account is required only for sync. Connecting an outside service — mail, calendar,
          tasks or similar — is optional and is authorised through that provider.
        </p>
        <p>You agree that:</p>
        <LegalList
          items={[
            "You have the right to connect the accounts you connect",
            "You are responsible for activity under your account",
            "You will not use a connector to access data you are not entitled to",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Plugins and Mini-Apps">
        <p>
          Terrarium can run plugins and mini-apps, including ones we did not write. Plugins receive
          only the capabilities you grant them.
        </p>
        <p>
          Third-party plugins are not our software. We do not endorse them, we are not responsible
          for what they do with access you grant, and you install them at your own risk. If you
          publish a plugin, you are responsible for it and for complying with these Terms.
        </p>
      </LegalSection>

      <LegalSection title="6. Acceptable Use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Use the app for any unlawful purpose",
            "Attempt to disrupt, overload or interfere with our sync or broker services",
            "Attempt to access other users' data or accounts",
            "Distribute malware through a plugin or mini-app",
            "Reverse engineer or resell the app except as permitted by applicable law",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <p>
          Terrarium, its name, design and code are the property of BetterU LLC, except for
          components licensed from others under their own terms. You may not copy or redistribute
          the app without permission.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          You may stop using Terrarium at any time by uninstalling it. Doing so leaves files that
          already lived elsewhere on your disk untouched.
        </p>
        <p>
          We may suspend access to sync, connectors or the assistant if these Terms are violated, or
          if required to protect the service or its users.
        </p>
      </LegalSection>

      <LegalSection title="9. Disclaimer of Warranties">
        <p>
          Terrarium is provided &quot;as is&quot; and &quot;as available,&quot; without warranties
          of any kind, express or implied.
        </p>
        <p>We do not guarantee that:</p>
        <LegalList
          items={[
            "The app will be uninterrupted or error-free",
            "Workspaces, notes or layouts will survive updates, crashes or migrations",
            "Sync will complete, or that a connector will stay connected",
            "Assistant output will be accurate or suitable for any purpose",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, BetterU LLC is not liable for any indirect,
          incidental, or consequential damages arising from your use of the app, including lost work
          or lost data.
        </p>
        <p>
          Where liability cannot be excluded, it is limited to the greater of the amount you paid
          for Terrarium in the twelve months before the claim, or $50 USD.
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
          We may update these Terms as the app changes. When updates occur, the &quot;Effective
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
