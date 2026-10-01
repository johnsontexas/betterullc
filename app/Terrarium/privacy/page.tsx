import { LegalPage, LegalSection, LegalSubSection, LegalList } from "@/components/legal-page";

export const metadata = {
  title: "Terrarium Privacy Policy - BetterU LLC",
  description: "Privacy Policy for the Terrarium desktop app by BetterU LLC",
};

export default function TerrariumPrivacyPage() {
  return (
    <LegalPage
      title="Terrarium Privacy Policy"
      effectiveDate="September 20, 2026"
      backLink={{ href: "/Terrarium", label: "Back to Terrarium" }}
    >
      <p>
        Terrarium (&quot;the App&quot;) is a desktop application for macOS and Windows, owned and
        operated by BetterU LLC. This Privacy Policy explains what Terrarium keeps on your machine,
        what it sends anywhere, and when.
      </p>
      <p>
        Terrarium is local-first. Your workspaces, notes, files and layouts live on your own disk.
        Nothing is sent to us unless you turn on a feature that requires it.
      </p>

      <LegalSection title="1. What Stays On Your Machine">
        <p>By default, Terrarium is not connected to any account and reports nothing.</p>
        <LegalList
          items={[
            "Workspaces, window layouts, themes and backgrounds",
            "Notes, reminders, timers and other panel contents",
            "Files you open or arrange on the canvas, which stay where they already are on disk",
            "Browser panel history, cookies and site data, stored locally like any browser",
          ]}
        />
        <p>
          These are written to Terrarium&apos;s application data folder on your computer. We cannot
          read them.
        </p>
      </LegalSection>

      <LegalSection title="2. Optional Features That Send Data">
        <LegalSubSection title="Account and Sync">
          <p>
            If you create an account to sync workspaces between machines, we store an account
            identifier and email address, plus the workspace data you choose to sync. Sync is opt-in;
            with it off, no workspace content leaves your computer.
          </p>
        </LegalSubSection>

        <LegalSubSection title="Connectors">
          <p>
            If you connect an outside account — mail, calendar, tasks or similar — you authorise it
            through that provider&apos;s own sign-in screen. We never see your password for it. The
            resulting access tokens are exchanged and refreshed by our broker service so the panel
            can show your data, and you can disconnect a connector at any time, which revokes its
            token.
          </p>
        </LegalSubSection>

        <LegalSubSection title="Browser Panels">
          <p>
            Sites you open in a browser panel are ordinary web pages: they see what any browser
            would show them, and they set their own cookies. That traffic goes directly from your
            machine to those sites and does not pass through us.
          </p>
        </LegalSubSection>

        <LegalSubSection title="The In-App Assistant">
          <p>
            If you use the built-in AI assistant, the text and context you give it are sent to the
            model provider to produce a reply. Only what you put in a request is sent — the assistant
            does not read your whole workspace on its own.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use the limited information described above to:</p>
        <LegalList
          items={[
            "Sync the workspaces you asked to sync",
            "Keep connectors authorised and refreshed",
            "Return the assistant replies you asked for",
            "Deliver updates and fix crashes",
          ]}
        />
        <p>
          We do not sell personal information. Terrarium shows no advertising and does not profile
          you for advertisers.
        </p>
      </LegalSection>

      <LegalSection title="4. Plugins and Mini-Apps">
        <p>
          Terrarium can run mini-apps and plugins. A plugin only receives the capabilities you grant
          it, and the permission model is enforced by the app.
        </p>
        <p>
          Plugins written by third parties are not ours, and their handling of anything you give
          them is governed by their own terms. Install ones you trust.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Storage and Security">
        <p>
          Local data sits in your user account&apos;s application data folder and is protected by
          your operating system&apos;s own file permissions and disk encryption, if you have it
          enabled. Anyone with access to your unlocked computer can read it.
        </p>
        <p>
          Synced data and connector tokens are held on secure cloud infrastructure. We take
          reasonable measures using industry-standard security practices, but no system can be
          guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection title="6. Sharing of Information">
        <p>We do not sell personal information to third parties.</p>
        <p>Information may be shared only in the following cases:</p>
        <LegalList
          items={[
            "With service providers that help operate sync, connectors and the assistant",
            "With a provider you explicitly connected, in order to fetch your data from it",
            "If required by law or legal process",
            "To protect the safety, rights, or property of users or the service",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Data Retention and Deletion">
        <p>
          Local data is yours and stays until you delete it or uninstall the app. If you used sync,
          you can delete your account and its synced workspaces; disconnecting a connector revokes
          its access token.
        </p>
        <p>
          Uninstalling Terrarium does not delete files that already lived elsewhere on your disk.
        </p>
      </LegalSection>

      <LegalSection title="8. Children's Privacy">
        <p>
          Terrarium is not intended for children under the age of 13. We do not knowingly collect
          personal information from children under 13. If such information is discovered, it will be
          deleted promptly.
        </p>
      </LegalSection>

      <LegalSection title="9. User Rights">
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

      <LegalSection title="10. Changes to This Privacy Policy">
        <p>
          Terrarium is still in development, and this policy will be revised as features ship. When
          updates occur, the &quot;Effective Date&quot; will be revised. Continued use of the app
          after changes indicates acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
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
