import type { Metadata } from "next"
import { LegalDocument } from "@/components/legal-document"

export const metadata: Metadata = {
  title: "Privacy Policy — Harcorp Industries",
  description:
    "Privacy Policy for harcorp.industries, operated by Harcorp Industries Private Limited.",
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      company="Harcorp Industries Private Limited"
      effectiveDate="June 24, 2026"
      intro={
        <>
          <p>
            Harcorp Industries (&ldquo;Harcorp,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
            your privacy while advancing the frontiers of artificial
            intelligence, quantum communication, advanced materials, and other
            transformative technologies. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website harcorp.industries (the &ldquo;Site&rdquo;),
            interact with our services, subscribe to our newsletter, or
            otherwise engage with us.
          </p>
          <p>
            By accessing or using the Site, you agree to the practices described
            in this Privacy Policy. If you do not agree, please do not use the
            Site.
          </p>
        </>
      }
      sections={[
        {
          title: "Information We Collect",
          content: (
            <>
              <p>We collect information in the following ways:</p>
              <p className="font-medium text-white/75">Information You Provide</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Contact information (name, email address) when you subscribe
                  to our newsletter or reach out via contact forms.
                </li>
                <li>
                  Any other information you voluntarily provide in
                  communications with us.
                </li>
              </ul>
              <p className="font-medium text-white/75">
                Automatically Collected Information
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Usage data such as IP address, browser type, device
                  information, operating system, and pages visited.
                </li>
                <li>
                  Cookies and similar tracking technologies to understand Site
                  performance and user preferences.
                </li>
                <li>
                  Analytics data on how users interact with the Site (e.g., time
                  spent, clicks, navigation paths).
                </li>
              </ul>
              <p className="font-medium text-white/75">
                Information from Third Parties
              </p>
              <p>
                We may receive limited data from analytics providers or social
                media platforms if you interact with our presence there.
              </p>
            </>
          ),
        },
        {
          title: "How We Use Your Information",
          content: (
            <>
              <p>We use the collected information to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Operate, maintain, and improve the Site and our communications.</li>
                <li>
                  Send newsletter updates, announcements, and thought leadership
                  content related to our work in AI, quantum technologies,
                  materials science, and long-term innovation.
                </li>
                <li>Respond to your inquiries and provide customer support.</li>
                <li>
                  Analyze Site usage and trends to enhance user experience.
                </li>
                <li>
                  Comply with legal obligations and protect our rights, safety,
                  and property.
                </li>
                <li>
                  Conduct internal research and development aligned with our
                  mission to engineer intelligence and matter for humanity&apos;s
                  benefit.
                </li>
              </ul>
              <p>We do not sell your personal information.</p>
            </>
          ),
        },
        {
          title: "Sharing of Information",
          content: (
            <>
              <p>We may share your information with:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Service providers who assist us in operating the Site (e.g.,
                  hosting, analytics, email delivery) under strict
                  confidentiality agreements.
                </li>
                <li>
                  Professional advisors, auditors, or legal authorities when
                  required by law or to protect our legitimate interests.
                </li>
                <li>
                  In the event of a merger, acquisition, or sale of assets, where
                  your information may be transferred as part of the transaction.
                </li>
              </ul>
              <p>
                We do not share personal data with third parties for their own
                marketing purposes.
              </p>
            </>
          ),
        },
        {
          title: "Data Security",
          content: (
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your personal information. However, no
              method of transmission over the internet or electronic storage is
              100% secure. We cannot guarantee absolute security.
            </p>
          ),
        },
        {
          title: "Cookies and Tracking Technologies",
          content: (
            <p>
              We use essential cookies for Site functionality and analytics
              cookies (e.g., Google Analytics) to understand visitor behavior.
              You can manage cookie preferences through your browser settings. We
              do not use tracking for cross-site advertising.
            </p>
          ),
        },
        {
          title: "Your Rights and Choices",
          content: (
            <>
              <p>Depending on your location, you may have rights to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Access, correct, or delete your personal information.</li>
                <li>
                  Opt out of certain processing activities, including marketing
                  communications (you can unsubscribe via the link in every
                  email).
                </li>
                <li>Object to or request restriction of processing.</li>
                <li>Data portability where applicable.</li>
              </ul>
              <p>
                To exercise these rights, please contact us at the details
                below. We will respond within applicable legal timelines.
              </p>
            </>
          ),
        },
        {
          title: "International Data Transfers",
          content: (
            <p>
              Harcorp is based in India. Your information may be processed in
              India or other countries where our service providers operate. We
              take appropriate measures to ensure your data receives adequate
              protection consistent with this Privacy Policy.
            </p>
          ),
        },
        {
          title: "Children's Privacy",
          content: (
            <p>
              Our Site is not directed to children under the age of 18. We do
              not knowingly collect personal information from children. If we
              become aware that we have collected such data, we will take steps
              to delete it promptly.
            </p>
          ),
        },
        {
          title: "Changes to This Privacy Policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of material changes by posting the updated policy on the Site
              with a revised effective date. Your continued use of the Site after
              such changes constitutes acceptance of the updated policy.
            </p>
          ),
        },
      ]}
      contact={
        <>
          <p>
            For any questions or requests regarding this Privacy Policy, please
            reach out to:
          </p>
          <p>Harcorp Industries Private Limited</p>
          <p>
            Email:{" "}
            <a
              href="mailto:privacy@harcorp.industries"
              className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              privacy@harcorp.industries
            </a>
          </p>
        </>
      }
      closing={
        <>
          <p>
            We are committed to transparency as we build technologies that shape
            the future.
          </p>
          <p>© 2026 Harcorp Industries Private Limited. All rights reserved.</p>
        </>
      }
    />
  )
}
