import Link from "next/link";
import { siteSchemaGraph, type BreadcrumbItem } from "@/lib/jsonLd";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  withSchema?: boolean;
};

export function Breadcrumbs({ items, className = "", withSchema = true }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const schema = withSchema ? siteSchemaGraph({ breadcrumbs: items }) : null;
  const rootClass = ["site-breadcrumbs", className].filter(Boolean).join(" ");

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      <nav aria-label="Breadcrumb" className={rootClass}>
        <ol className="site-breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.path}-${item.name}`} className="site-breadcrumbs-item">
                {isLast ? (
                  <span className="site-breadcrumbs-current" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="site-breadcrumbs-link">
                    {item.name}
                  </Link>
                )}
                {!isLast ? (
                  <span className="site-breadcrumbs-sep" aria-hidden>
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
