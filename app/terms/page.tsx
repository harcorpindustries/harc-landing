import type { Metadata } from "next"
import { LegalDocument } from "@/components/legal-document"

export const metadata: Metadata = {
  title: "Terms of Service — Harcorp Industries",
  description:
    "Terms of Service for harcorp.industries, operated by Harcorp Industries Private Limited.",
}

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      company="Harcorp Industries Private Limited"
      effectiveDate="June 24, 2026"
      intro={
        <>
          <p>
            Welcome to harcorp.industries (the &ldquo;Site&rdquo;), operated by
            Harcorp Industries Private Limited (&ldquo;Harcorp,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These
            Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
            use of the Site, including any content, functionality, and services
            offered through it.
          </p>
          <p>
            By accessing or using the Site, you agree to be bound by these Terms.
            If you do not agree, please do not use the Site.
          </p>
        </>
      }
      sections={[
        {
          title: "Use of the Site",
          content: (
            <>
              <p>
                The Site provides information about Harcorp Industries, our
                research, flagship projects (including Harcorp.AI, HarcNet, and
                Mimic.Codes), focus areas, and updates in the fields of
                artificial intelligence, quantum technologies, advanced
                materials, and related deep-tech domains.
              </p>
              <p>
                You may use the Site only for lawful purposes and in accordance
                with these Terms. You agree not to use the Site in any manner
                that could disable, overburden, damage, or impair the Site or
                interfere with any other party&apos;s use of the Site.
              </p>
            </>
          ),
        },
        {
          title: "Intellectual Property Rights",
          content: (
            <>
              <p>
                All content on the Site—including text, graphics, logos,
                images, animations (such as the interactive globe), and underlying
                code—is the property of Harcorp Industries or its licensors and
                is protected by copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may view and print portions of the Site for personal,
                non-commercial use, provided you do not modify or delete any
                copyright or proprietary notices. Any other use, including
                reproduction, distribution, modification, or public display for
                commercial purposes, is strictly prohibited without our prior
                written consent.
              </p>
              <p>
                Our trademarks, service marks, and branding (including
                &ldquo;Harcorp Industries,&rdquo; &ldquo;Harcorp.AI,&rdquo;
                &ldquo;HarcNet,&rdquo; and &ldquo;Mimic.Codes&rdquo;) may not be
                used without our express permission.
              </p>
            </>
          ),
        },
        {
          title: "User Conduct and Prohibited Activities",
          content: (
            <>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Use the Site for any unlawful purpose or in violation of any
                  applicable laws or regulations.
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the Site or
                  its systems.
                </li>
                <li>
                  Introduce any viruses, trojans, or other malicious code.
                </li>
                <li>
                  Scrape, data mine, or use automated tools to extract content
                  from the Site.
                </li>
                <li>
                  Transmit unsolicited advertising, spam, or promotional
                  materials.
                </li>
                <li>
                  Impersonate any person or entity or misrepresent your
                  affiliation with Harcorp.
                </li>
              </ul>
              <p>
                We reserve the right to terminate or restrict your access to the
                Site at any time, without notice, for any reason.
              </p>
            </>
          ),
        },
        {
          title: "Third-Party Links and Resources",
          content: (
            <p>
              The Site may contain links to third-party websites or resources.
              These are provided for convenience only. Harcorp does not endorse
              and is not responsible for the content, accuracy, or practices of
              any third-party sites. Your use of such sites is at your own risk.
            </p>
          ),
        },
        {
          title: "Disclaimers",
          content: (
            <>
              <p>
                The Site and all content are provided on an &ldquo;as is&rdquo;
                and &ldquo;as available&rdquo; basis. Harcorp makes no
                warranties, express or implied, regarding the accuracy,
                completeness, reliability, or availability of the Site or its
                content. Information on the Site is for informational purposes
                only and does not constitute professional, technical, or
                investment advice.
              </p>
              <p>
                We do not warrant that the Site will be uninterrupted,
                error-free, or free of harmful components.
              </p>
            </>
          ),
        },
        {
          title: "Limitation of Liability",
          content: (
            <>
              <p>
                To the fullest extent permitted by law, Harcorp and its
                affiliates, directors, officers, employees, and agents shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or related to
                your use of the Site, even if advised of the possibility of such
                damages.
              </p>
              <p>
                Our total liability to you for any claim shall not exceed one
                hundred U.S. dollars (USD 100) or the amount you paid to us (if
                any) in the twelve months preceding the claim, whichever is
                greater.
              </p>
            </>
          ),
        },
        {
          title: "Indemnification",
          content: (
            <p>
              You agree to indemnify, defend, and hold harmless Harcorp and its
              affiliates from and against any claims, liabilities, damages,
              losses, and expenses (including reasonable legal fees) arising out
              of your violation of these Terms or your use of the Site.
            </p>
          ),
        },
        {
          title: "Governing Law and Dispute Resolution",
          content: (
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising under these Terms shall
              be resolved exclusively in the courts located in India.
            </p>
          ),
        },
        {
          title: "Changes to These Terms",
          content: (
            <p>
              We may update these Terms from time to time. We will notify you of
              material changes by posting the revised Terms on the Site with an
              updated effective date. Your continued use of the Site after such
              changes constitutes acceptance of the new Terms.
            </p>
          ),
        },
      ]}
      contact={
        <>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>Harcorp Industries Private Limited</p>
          <p>
            Email:{" "}
            <a
              href="mailto:legal@harcorp.industries"
              className="text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              legal@harcorp.industries
            </a>
          </p>
        </>
      }
      closing={
        <>
          <p>
            Thank you for engaging with Harcorp Industries as we work to alter
            the future—from the point to the superstructure—by building
            artificial super intelligence and advanced matter.
          </p>
          <p>© 2026 Harcorp Industries Private Limited. All rights reserved.</p>
        </>
      }
    />
  )
}
