import type { ReactNode } from "react";
import Link from "next/link";

type Section = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  eyebrow?: string;
  sections: Section[];
  relatedLinks?: { href: string; label: string }[];
  children?: ReactNode;
};

export function LegalPage({
  title,
  intro,
  eyebrow = "Información legal",
  sections,
  relatedLinks,
  children,
}: LegalPageProps) {
  return (
    <main className="content-page flex-1">
      <div className="content-page-inner mx-auto w-full max-w-content px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="content-page-hero">
          <p className="content-page-eyebrow">{eyebrow}</p>
          <h1 className="content-page-title">{title}</h1>
          <p className="content-page-intro">{intro}</p>
        </header>

        <div className="content-page-sections">
          {sections.map((section, index) => (
            <section key={section.heading} className="content-page-card">
              <span className="content-page-card-num" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="content-page-card-title">{section.heading}</h2>
              <div className="content-page-card-body">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {children}

        {relatedLinks && relatedLinks.length > 0 ? (
          <aside className="content-page-related" aria-label="Enlaces relacionados">
            <h2 className="content-page-related-title">También te puede interesar</h2>
            <div className="content-page-related-links">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="content-page-related-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  );
}
