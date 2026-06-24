import Link from "next/link";
import { breadcrumbListNode, type BreadcrumbItem } from "@/lib/jsonLd";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const schema = breadcrumbListNode(items);
  const rootClass = ["site-breadcrumbs", className].filter(Boolean).join(" ");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
