import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy for UF Calculator Chile, including cookies, analytics, and advertising disclosures.",
};

const sections = [
  {
    heading: "1. Scope and Commitment",
    paragraphs: [
      "UF Calculator Chile is committed to protecting personal data in a transparent and practical way. This Privacy Policy explains what information is collected when you use the website, how that information is processed, and what controls are available to you. The policy applies to all pages, including the converter tool, contact route, legal pages, and informational content. By accessing the website, you confirm that you understand these practices and accept them within the limits described here.",
      "This project is designed to operate with minimal personal data exposure. Core conversion functionality does not require registration and can be used without creating an account. We do not sell personal information, and we do not intentionally collect sensitive financial credentials, national identity numbers, or banking passwords. If you submit information through a contact form, you should provide only what is necessary for your request.",
    ],
  },
  {
    heading: "2. Data We Collect",
    paragraphs: [
      "We may collect technical data automatically through standard web infrastructure. This can include IP address, browser type, operating system, device class, approximate region, referrer URL, page views, and interaction timestamps. This information is typically used for security, diagnostics, and aggregated analytics. We also collect event-level information tied to product usage, such as tool interactions, page depth, and click behavior, to improve performance and usability over time.",
      "When you contact us through the contact page, we may collect your name, email address, and message body. This information is used only for support, quality monitoring, and compliance recordkeeping. We ask users not to include confidential legal, tax, banking, or investment records in open text fields. If such data is submitted, we will handle it with care but cannot guarantee immediate deletion from all backup systems.",
    ],
  },
  {
    heading: "3. Cookies, Analytics, and Advertising",
    paragraphs: [
      "The website may use cookies and similar technologies to store session preferences, understand usage trends, and support technical reliability. Cookies may be first-party or set by trusted third-party tools used for analytics and website operations. You can control cookie behavior through your browser settings, including blocking or deleting stored cookies; however, some features may not function optimally if all cookies are disabled.",
      "We may use analytics tools to measure traffic quality, interaction patterns, and feature adoption. Analytics data is generally aggregated and pseudonymized, but it may still be considered personal data under local law depending on jurisdiction. We also disclose that the site may run Google AdSense or other affiliate/advertising programs in the future. These providers can use cookies or device identifiers to serve relevant ads and report campaign performance.",
    ],
  },
  {
    heading: "4. How and Why We Use Data",
    paragraphs: [
      "Collected data supports service delivery, fraud prevention, uptime monitoring, troubleshooting, and product improvement. We may analyze anonymous usage behavior to identify navigation friction, improve mobile layout quality, and refine legal disclosures. Data may also be used to respond to inquiries, enforce terms, and comply with legal obligations. We do not profile users for automated credit scoring or financial eligibility decisions.",
      "Our legal basis for processing can include legitimate interests, consent where required, and compliance with statutory obligations. Where consent is necessary for analytics or marketing identifiers, users should be informed through a consent mechanism when implemented. Data use is limited to reasonable business operations and user communication related to this website. We avoid collection practices that are excessive relative to the stated purpose.",
    ],
  },
  {
    heading: "5. Retention, Security, and International Transfer",
    paragraphs: [
      "We retain personal data only as long as needed for support, legal compliance, security investigation, and operational continuity. Contact records may be stored for a limited period to resolve repeated issues, prevent abuse, and maintain an auditable communication trail. Aggregated analytics may be retained longer for trend analysis, but those reports generally do not identify individual users directly.",
      "Reasonable technical and organizational safeguards are implemented to reduce unauthorized access, misuse, alteration, or disclosure of information. No online service can guarantee absolute security, and users acknowledge residual risk when transmitting data over the internet. Some infrastructure providers may process data in regions outside Chile. By using the service, you understand that cross-border transfer may occur under provider contractual safeguards.",
    ],
  },
  {
    heading: "6. Your Rights and Contact",
    paragraphs: [
      "Depending on your jurisdiction, you may have rights to request access, correction, deletion, restriction, objection, or portability of personal data. You may also request clarification about data sources, processing purposes, and third-party recipients. We will evaluate requests in good faith and respond within a reasonable timeframe, subject to identity verification and legal exceptions.",
      "If you have concerns about privacy practices, contact us via the Contact page. You may also request details about affiliate disclosures, analytics partners, and cookie categories. This policy may be updated as legal or operational requirements evolve. Material changes will be reflected by updating the effective date and publishing revised content on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains how UF Calculator Chile handles personal data, cookies, analytics, and advertising disclosures in a financial-tool context."
      sections={sections}
    />
  );
}
