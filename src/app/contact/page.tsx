import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact UF Calculator Chile for support, compliance questions, partnership inquiries, and feedback.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-content-narrow flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">Contact UF Calculator Chile</h1>
      <p className="mt-4 text-width text-base text-text-secondary">
        If you need help with UF Calculator Chile, want to report a data issue, or have legal/compliance questions, you can contact
        our team through the form below. For quick context, visit the{" "}
        <a href="/privacy-policy" className="font-semibold text-primary underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms-and-conditions" className="font-semibold text-primary underline">
          Terms & Conditions
        </a>{" "}
        before sending sensitive requests.
      </p>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-glass">
        <h2 className="text-2xl font-semibold text-text-primary">Send a message</h2>
        <form className="mt-4 grid gap-4" aria-label="Contact form">
          <label className="text-sm text-text-secondary">
            Name
            <input className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-text-primary" />
          </label>
          <label className="text-sm text-text-secondary">
            Email
            <input type="email" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-text-primary" />
          </label>
          <label className="text-sm text-text-secondary">
            Message
            <textarea rows={5} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-text-primary" />
          </label>
          <button type="button" className="w-fit rounded-lg bg-button px-5 py-2 text-sm font-medium text-white">
            Submit
          </button>
        </form>
      </section>

      <section className="mt-8 space-y-4 text-base text-text-secondary">
        <h2 className="text-2xl font-semibold text-text-primary">Support and Compliance Information</h2>
        <p>
          We provide support for usability issues, conversion display questions, content clarifications, and legal notice requests.
          Typical response windows are one to three business days depending on volume and the complexity of the inquiry. If your
          question involves a transaction deadline, we recommend validating values directly with an official institution immediately,
          because website support channels are not a real-time execution service.
        </p>
        <p>
          Please include clear details when contacting us: page URL, timestamp, device type, browser version, and a concise
          description of the observed issue. Structured details help us reproduce errors quickly and improve the platform. We may ask
          follow-up questions to verify context before taking operational action. For legal notices, include your full name, role,
          organization, and relevant jurisdiction so we can route your request appropriately.
        </p>
        <p>
          UF Calculator Chile is intended for informational conversion support and educational content. We are not a legal office,
          accounting firm, lender, or regulated financial advisory service. Communication sent through this page does not create a
          fiduciary relationship, attorney-client privilege, or guaranteed response obligation beyond reasonable effort. Messages are
          handled with care, but users should avoid sending confidential credentials, payment card data, personal identification
          numbers, or highly sensitive banking records through open-text forms.
        </p>
        <p>
          If your request concerns data quality, include the UF value shown, expected value, and the source used for comparison. Keep
          in mind that differences may occur due to update timing, caching intervals, and institutional rounding policy. The site is
          designed for fast public reference and resilience, including fallback behavior when upstream data providers are temporarily
          unavailable. For contractual obligations such as mortgage settlement, rent adjustment, or invoice issuance, always verify
          numbers with the institution that governs your contract.
        </p>
        <p>
          Cookies and analytics may be used to understand aggregate traffic and improve reliability. If your message includes a privacy
          concern, identify the specific behavior observed and the jurisdiction you want us to consider. We will review requests in
          good faith, subject to legal obligations and practical verification constraints. We may retain communication logs for security,
          abuse prevention, and compliance recordkeeping. Additional retention details are documented in our Privacy Policy.
        </p>
        <p>
          This website may display advertising or affiliate disclosures, including potential future use of AdSense placements. If your
          inquiry relates to sponsored content, identify the affected page and placement so we can review labeling and presentation.
          Monetization does not alter the informational purpose of the conversion tool. Users are encouraged to perform independent
          evaluation before acting on any promoted services or third-party references.
        </p>
        <p>
          For partnerships, media requests, or business integration discussions, include your organization profile, project scope,
          expected timeline, and technical requirements. We prioritize proposals that align with transparent financial education,
          responsible product communication, and clear user value for Chilean audiences. Not all partnership inquiries can be accepted,
          but we review each submission with a focus on trust, compliance, and long-term user benefit.
        </p>
        <p>
          If you need to submit a formal legal or regulatory notice, clearly state the legal basis of your request and include
          supporting evidence where applicable. We may seek identity verification to protect user data and prevent unauthorized claims.
          Nothing on this page limits your statutory rights under applicable law. This contact information is provided to enable
          transparent communication while preserving platform integrity and user safety.
        </p>
      </section>
    </main>
  );
}
