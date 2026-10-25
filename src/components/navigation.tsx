'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { ArrowUpRight, Download, MapPin, Menu, Send, X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import { ModuleIcon } from './module-icon';
import { ChromeBrandMark } from './chrome-brand-mark';
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="nav-links">
      {navigation.map(({ href, label, index }) => {
        const active =
          href === '/' ? pathname === href : pathname.startsWith(`${href}/`) || pathname === href;
        return (
          <li key={href}>
            <Link href={href} aria-current={active ? 'page' : undefined} onClick={onNavigate}>
              <ModuleIcon index={index} className="nav-icon" />
              <span className="nav-label">
                <span className="nav-label-track">
                  <span>{label}</span>
                  <span aria-hidden="true">{label}</span>
                </span>
              </span>
              <span className="nav-marker" aria-hidden="true">
                <ArrowUpRight size={12} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
export function SocialLinks() {
  const links = [
    { label: 'github', url: profile.github },
    { label: 'linkedin', url: profile.linkedin },
  ].filter((item) => item.url);
  if (!links.length) return null;
  return (
    <div className="social-links">
      {links.map(({ label, url }) => (
        <a key={label} href={url} target="_blank" rel="noopener noreferrer">
          {label}
          <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 18V6.5L12 13l8.5-6.5V18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BrandMark({ name }: { name: 'github' | 'linkedin' | 'facebook' | 'gmail' }) {
  if (name === 'gmail') return <GmailMark />;
  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.08c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.73 2.64 1.24 3.28.95.1-.73.4-1.23.71-1.52-2.49-.28-5.1-1.24-5.1-5.54 0-1.22.43-2.23 1.15-3.02-.12-.28-.5-1.43.1-2.98 0 0 .94-.3 3.07 1.16a10.7 10.7 0 0 1 5.58 0c2.13-1.46 3.06-1.16 3.06-1.16.61 1.55.23 2.7.11 2.98.72.79 1.15 1.8 1.15 3.02 0 4.31-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.07v3.1c0 .3.2.64.77.53A11.2 11.2 0 0 0 12 .8Z" />
      </svg>
    );
  }
  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="5.3" cy="5.4" r="1.8" />
        <path d="M3.7 8.7h3.2v10H3.7zm5.2 0H12v1.4c.7-1.1 1.8-1.8 3.4-1.8 3.3 0 4 2.2 4 5v5.4h-3.3v-4.8c0-1.2 0-2.6-1.7-2.6s-2 1.3-2 2.6v4.8H8.9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.55 22v-8.2h2.76l.41-3.2h-3.17V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14c-.3-.04-1.33-.14-2.53-.14-2.5 0-4.2 1.53-4.2 4.34v2.26H7.3v3.2h2.82V22h3.43Z" />
    </svg>
  );
}
function SocialBrandLinks() {
  const links = [
    { label: 'GitHub', href: profile.github, name: 'github' },
    { label: 'LinkedIn', href: profile.linkedin, name: 'linkedin' },
    { label: 'Facebook', href: profile.facebook, name: 'facebook' },
    { label: 'Gmail', href: 'mailto:bolatinjohnbenedict@gmail.com', name: 'gmail' },
  ] as const;

  return (
    <div className="social-brand-links" aria-label="Social profiles">
      {links.map(({ label, href, name }) =>
        href ? (
          <a key={label} className="social-icon" href={href} target={name === 'gmail' ? undefined : '_blank'} rel={name === 'gmail' ? undefined : 'noopener noreferrer'} aria-label={label} data-social={name}>
            <span className="social-fill" aria-hidden="true" />
            <BrandMark name={name} />
          </a>
        ) : (
          <span key={label} className="social-icon" aria-hidden="true" data-social={name}>
            <span className="social-fill" />
            <BrandMark name={name} />
          </span>
        ),
      )}
    </div>
  );
}
function ReachOut() {
  return (
    <div className="reach-out">
      {profile.resume ? (
        <a className="text-link resume-link" href={profile.resume} download>
          <Download size={14} aria-hidden="true" />
          <span className="link-underline-label">download my resume</span>
        </a>
      ) : (
        <span className="text-link resume-link" aria-disabled="true">
          <Download size={14} aria-hidden="true" />
          download my resume
        </span>
      )}
      <div className="reach-out-divider" aria-hidden="true" />
      <div className="contact-location">
        <span className="contact-location-label">based in</span>
        <span className="contact-location-value">
          <MapPin size={12} aria-hidden="true" />
          <span>Caloocan City, Philippines</span>
        </span>
      </div>
      <p className="reach-out-label">connect with me</p>
      <SocialBrandLinks />
      <a className="message-button" href="mailto:bolatinjohnbenedict@gmail.com">
        <Send size={14} aria-hidden="true" />
        <span>send me a message</span>
      </a>
    </div>
  );
}
export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => dialog.current?.close();
  const restore = () => {
    document.body.style.overflow = '';
    trigger.current?.focus();
  };
  return (
    <>
      <aside className="sidebar">
        <Link href="/" className="wordmark" aria-label={`jb[_] — ${profile.name} home`}>
          <ChromeBrandMark className="nav-wordmark-mark" />
        </Link>
        <p className="sidebar-description">
          {profile.name}
        </p>
        <nav aria-label="Main navigation">
          <NavLinks />
        </nav>
        <div className="sidebar-bottom">
          <ReachOut />
        </div>
      </aside>
      <header className="mobile-header">
        <Link href="/" className="wordmark" aria-label={`jb[_] — ${profile.name} home`}>
          <ChromeBrandMark className="nav-wordmark-mark" />
        </Link>
        <button
          ref={trigger}
          className="icon-button"
          type="button"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={() => {
            dialog.current?.showModal();
            document.body.style.overflow = 'hidden';
          }}
        >
          <Menu size={20} />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="mobile-dialog"
        aria-label="Navigation menu"
        onClose={restore}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-dialog-inner">
          <div className="dialog-heading">
            <span className="micro">navigation</span>
            <button
              className="icon-button"
              type="button"
              onClick={close}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <NavLinks onNavigate={close} />
          </nav>
          <ReachOut />
        </div>
      </dialog>
    </>
  );
}
