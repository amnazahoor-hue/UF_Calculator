type Section = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  sections: Section[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-content-narrow flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">{title}</h1>
      <p className="mt-4 text-width text-base text-text-secondary">{intro}</p>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-text-primary">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
