import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import type { ModuleIndex } from './module-icon';
import { ChromeSectionIcon } from './chrome-section-icon';
import { BackToTop } from './back-to-top';
export function TextLink({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span className="link-underline-label">{children}</span>
      {external ? (
        <ArrowUpRight size={14} aria-hidden="true" />
      ) : (
        <ArrowRight size={14} aria-hidden="true" />
      )}
    </>
  );
  return external ? (
    <a className={`text-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link className={`text-link ${className}`} href={href}>
      {content}
    </Link>
  );
}
export function SectionHeading({
  number,
  title,
  href,
  linkLabel,
  showNumber = true,
}: {
  number: ModuleIndex;
  title: string;
  href?: string;
  linkLabel?: string;
  showNumber?: boolean;
}) {
  return (
    <div className="section-heading">
      <h2>
        {showNumber && <span>{number}</span>}
        <ChromeSectionIcon index={number} />
        {title}
      </h2>
      {href && <TextLink href={href}>{linkLabel ?? 'view all'}</TextLink>}
    </div>
  );
}
export function PageHeading({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual?: React.ReactNode;
}) {
  return (
    <header className={`page-heading${visual ? ' page-heading-with-visual' : ''}`}>
      <div className="page-heading-copy">
        <div className="page-heading-title-row">
          {visual && <div className="page-heading-visual">{visual}</div>}
          <h1>
            {title}
            <span className="heading-period">.</span>
          </h1>
        </div>
        <p className="page-description">{description}</p>
      </div>
    </header>
  );
}
export function EmptyState({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="empty-state">
      <span className="empty-glyph" aria-hidden="true">
        [ · · · ]
      </span>
      <div>
        <h2>{label}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span className="footer-note">
        built with intention
      </span>
      <BackToTop />
    </footer>
  );
}
