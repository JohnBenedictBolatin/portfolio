import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { ModuleIcon, type ModuleIndex } from './module-icon';
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
      {children}
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
  index,
  title,
  description,
}: {
  index: ModuleIndex;
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">
        <ModuleIcon index={index} />
        {index} / portfolio
      </p>
      <h1>
        {title}
        <span className="heading-period">.</span>
      </h1>
      <p className="page-description">{description}</p>
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
