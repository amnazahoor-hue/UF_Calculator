import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Financial and legal disclaimer for UF Calculator Chile, including informational-use and advertising statements.",
};

const sections = [
  {
    heading: "1. Informational Use Only",
    paragraphs: [
      "UF Calculator Chile is an informational calculator designed to help users estimate conversions between UF and CLP. It is not a financial institution service and does not provide personal financial advice, legal analysis, tax strategy, mortgage underwriting guidance, or investment recommendations. Users must evaluate whether calculated values are suitable for their own context and verify critical figures with official and contractual sources.",
      "All examples and explanations are educational in nature. No content on this site should be interpreted as an offer, solicitation, guarantee, or professional engagement. If a decision involves legal obligations, financing, accounting treatment, or regulatory submissions, users should consult a qualified professional in Chile who can evaluate the full factual context.",
    ],
  },
  {
    heading: "2. Data Source and Timing Variability",
    paragraphs: [
      "The platform relies on publicly accessible indicator data from mindicador and related official publications. While we strive for accurate implementation, timing differences can occur because sources may update at specific schedules and systems may cache data for performance. A conversion performed at one moment may differ slightly from values used later by institutions using different update windows.",
      "For resilience, the website may serve a fallback UF rate when upstream data is unavailable. This protects user access but is not a substitute for final transactional verification. Before signing agreements, making payments, or issuing invoices based on UF-linked clauses, users should confirm the exact value required by the relevant bank, regulator, or contract administrator.",
    ],
  },
  {
    heading: "3. No Warranty and No Professional Relationship",
    paragraphs: [
      "The service is provided without guarantees of completeness, uninterrupted uptime, or fitness for any specific transaction. We do not warrant that all calculations meet every accounting policy, lender process, or court-level evidentiary standard. Website use does not establish a fiduciary, advisory, attorney-client, auditor-client, or agency relationship between users and the site operator.",
      "Any reliance on the calculator is at your own risk. You are solely responsible for reviewing outputs and deciding whether additional verification is needed. The operator does not assume responsibility for losses caused by misunderstandings, delayed updates, rounding differences, or misuse of values outside the intended informational context.",
    ],
  },
  {
    heading: "4. Ads, Affiliate Relationships, and Monetization",
    paragraphs: [
      "This website may include advertising, referral links, sponsored references, or affiliate partnerships, including services such as Google AdSense. If you click a partner link or view an ad, the operator may receive compensation. These monetization channels support free access to the converter but do not alter our objective to provide clear and practical information.",
      "Sponsored or affiliate references should not be interpreted as guarantees of product suitability for your needs. You should perform independent due diligence and compare alternatives. We do not control all third-party pages and are not responsible for their claims, policies, or data handling practices.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, the operator is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the site. This includes loss of revenue, business interruption, contract disputes, financing delays, data loss, or reputational impact tied to reliance on displayed outputs.",
      "If liability cannot be fully excluded under mandatory law, it is limited to the minimum legally allowed scope. Users agree that they are responsible for validating figures before any legal, tax, lending, or commercial action. This allocation of responsibility is a core condition of using the service.",
    ],
  },
  {
    heading: "6. User Responsibility and Updates",
    paragraphs: [
      "Users must apply professional judgment and verify relevant legal and financial parameters before taking action. For complex transactions, it is prudent to confirm UF values directly with official institutions and consult qualified advisers. This site is one input in a broader decision process, not the single source of truth for high-stakes outcomes.",
      "This disclaimer can be updated as operations, legal obligations, or monetization practices evolve. Continued use implies acceptance of the current version. If you have questions about this disclaimer or site practices, please contact us through the Contact page for clarification.",
    ],
  },
  {
    heading: "7. External Links and Third-Party Content",
    paragraphs: [
      "From time to time, the website may reference or link to third-party content for convenience, education, or comparison. Those resources are governed by their own terms and policies. We do not guarantee the accuracy, legality, or security of external pages and are not responsible for losses caused by external platform changes, outages, or policy updates.",
      "Before relying on third-party tools, users should independently review provider credentials, legal disclosures, fee structures, and operational risks. External links are informational references only and do not constitute endorsement. Users remain responsible for validating any external material that influences legal, financial, or contractual decisions.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="This disclaimer defines the informational nature of UF Calculator Chile and the limits of liability, data guarantees, and commercial disclosures."
      sections={sections}
    />
  );
}
