import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Review terms for using UF Calculator Chile, including acceptable use, liability boundaries, and compliance statements.",
};

const sections = [
  {
    heading: "1. Acceptance and Eligibility",
    paragraphs: [
      "These Terms and Conditions govern your use of UF Calculator Chile and all related pages. By using the site, you agree to be bound by these terms. If you do not agree, you should discontinue use. The service is intended for users seeking informational conversion between UF and CLP. You are responsible for ensuring your use complies with local law and professional obligations relevant to your situation.",
      "You represent that you can enter into a binding agreement and that any information you provide through contact channels is accurate to the best of your knowledge. Access may be suspended or limited where misuse, fraud signals, or technical abuse is detected. We reserve the right to update these terms periodically, and continued use after updates constitutes acceptance of the revised version.",
    ],
  },
  {
    heading: "2. Service Nature and Limitations",
    paragraphs: [
      "UF Calculator Chile provides indicative conversion outputs based on publicly available UF indicator data. It is not a brokerage, bank, accounting platform, legal advisory service, or regulated investment intermediary. Outputs are generated automatically and may differ from figures used by lenders, institutions, contracts, or regulators due to timing, rounding, cutoff schedules, or implementation methodology.",
      "We work to maintain uptime and accurate display logic, but we do not guarantee uninterrupted availability, zero latency, or absolute precision in all contexts. Temporary outages can occur due to third-party API issues, hosting events, or maintenance windows. A fallback rate may be used to preserve site continuity when live data is unavailable, and users must verify final values before contractual or financial commitment.",
    ],
  },
  {
    heading: "3. Acceptable Use and Prohibited Conduct",
    paragraphs: [
      "You agree to use the service in a lawful and respectful manner. Prohibited behavior includes scraping that harms availability, attempting unauthorized system access, introducing malicious code, automated abuse of endpoints, and use of the site for deceptive commercial representations. You may not present converter outputs as official legal settlement values without independent validation from authoritative sources.",
      "Any attempt to interfere with security controls or infrastructure may result in immediate blocking and, where required, notification to relevant authorities. We may log technical events needed to investigate abuse, enforce policy, and protect the integrity of the service. These controls help preserve fair access for all users and maintain reliability for legitimate use cases.",
    ],
  },
  {
    heading: "4. Intellectual Property and Content",
    paragraphs: [
      "All website text, visual identity, layout, code structure, and branding elements are owned by or licensed to the site operator unless otherwise indicated. You may view and use content for personal or internal business reference, but you may not reproduce, republish, or commercially redistribute substantial portions without written permission.",
      "Third-party names, trademarks, or references to institutions are used for descriptive purposes only. Such references do not imply endorsement, partnership, or sponsorship unless explicitly stated. If you believe content infringes rights, contact us with sufficient detail for review and good-faith resolution.",
    ],
  },
  {
    heading: "5. Disclaimers, Ads, and Liability",
    paragraphs: [
      "The service is provided on an 'as is' and 'as available' basis. To the maximum extent permitted by law, we disclaim warranties regarding fitness for a particular purpose, uninterrupted operation, and non-infringement. Conversion outputs are informational and should not be treated as formal accounting, tax, legal, or investment advice.",
      "The site may include affiliate links, sponsored placements, or advertising systems such as AdSense. Such relationships may generate compensation at no additional cost to users. Commercial content does not replace independent due diligence. In no event will the operator be liable for indirect, incidental, or consequential losses arising from reliance on site outputs or temporary service interruption.",
    ],
  },
  {
    heading: "6. Governing Principles and Contact",
    paragraphs: [
      "These terms are interpreted according to applicable legal principles in the jurisdiction where the operator is based, subject to mandatory consumer protections. If any clause is found invalid, the remaining clauses continue in force. Failure to enforce a provision does not waive future enforcement rights.",
      "Questions about these terms, operational compliance, or legal notices should be submitted through the Contact page. We may request additional context to investigate contractual concerns and answer regulatory questions. The latest version of these terms is always published on this route and should be reviewed periodically.",
    ],
  },
  {
    heading: "7. Operational Continuity and Evidence",
    paragraphs: [
      "We maintain operational logs and audit-style technical records to monitor uptime, diagnose incidents, and improve resilience. These records may include request metadata, endpoint health snapshots, and platform events that support continuity planning. Log retention follows practical security and compliance needs and is not intended to profile users for financial risk decisions.",
      "When users report disputes related to displayed outputs, we may review historical behavior captured in system logs and publicly available data snapshots. This process supports factual reconstruction but does not create a duty to arbitrate private contractual disagreements. Parties should rely on their governing contracts, institutional records, and professional advisers to resolve formal disputes.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms define how UF Calculator Chile can be used and the boundaries of liability, compliance, and intellectual property."
      sections={sections}
    />
  );
}
