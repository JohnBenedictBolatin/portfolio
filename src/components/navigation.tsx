'use client';
import Link from '@/components/activity-link';
import { usePathname } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MapPin, Menu, Send, X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import { ThemeControl } from './theme-provider';
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
    { label: 'Gmail', href: profile.email ? `mailto:${profile.email}` : undefined, name: 'gmail' },
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
function ReachOut({ onMessageClick }: { onMessageClick: (button: HTMLButtonElement) => void }) {
  return (
    <div className="reach-out">
      <div className="contact-location">
        <span className="contact-location-label">based in</span>
        <span className="contact-location-value">
          <MapPin size={12} aria-hidden="true" />
          <span>Caloocan City, Philippines</span>
        </span>
      </div>
      <p className="reach-out-label">connect with me</p>
      <SocialBrandLinks />
      {profile.email && (
        <button
          className="message-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="inquiry-dialog"
          onClick={(event) => onMessageClick(event.currentTarget)}
        >
          <Send size={14} aria-hidden="true" />
          <span>send me a message</span>
        </button>
      )}
    </div>
  );
}
export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const inquiryDialog = useRef<HTMLDialogElement>(null);
  const inquiryTrigger = useRef<HTMLButtonElement>(null);
  const inquiryName = useRef<HTMLInputElement>(null);
  const [showInquiryStatus, setShowInquiryStatus] = useState(false);
  const close = () => dialog.current?.close();
  const syncScrollLock = () => {
    document.body.style.overflow =
      dialog.current?.open || inquiryDialog.current?.open ? 'hidden' : '';
  };
  const restore = () => {
    syncScrollLock();
    trigger.current?.focus();
  };
  const openInquiry = (button: HTMLButtonElement) => {
    inquiryTrigger.current = button;
    setShowInquiryStatus(false);
    inquiryDialog.current?.showModal();
    inquiryName.current?.focus();
    syncScrollLock();
  };
  const closeInquiry = () => inquiryDialog.current?.close();
  const restoreInquiry = () => {
    syncScrollLock();
    inquiryTrigger.current?.focus();
  };
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowInquiryStatus(true);
  };
  return (
    <>
      <aside className="sidebar">
        <Link href="/" className="wordmark" aria-label={`JB monogram, ${profile.name} home`}>
          <ChromeBrandMark className="nav-wordmark-mark" variant="flat" />
        </Link>
        <p className="sidebar-description">
          {profile.name}
        </p>
        <nav aria-label="Main navigation">
          <NavLinks />
        </nav>
        <div className="sidebar-bottom">
          <ThemeControl />
          <ReachOut onMessageClick={openInquiry} />
        </div>
      </aside>
      <header className="mobile-header">
        <Link href="/" className="wordmark" aria-label={`JB monogram, ${profile.name} home`}>
          <ChromeBrandMark className="nav-wordmark-mark" variant="flat" />
        </Link>
        <button
          ref={trigger}
          className="icon-button"
          type="button"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={() => {
            dialog.current?.showModal();
            syncScrollLock();
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
          <ThemeControl />
          <ReachOut onMessageClick={openInquiry} />
        </div>
      </dialog>
      <dialog
        ref={inquiryDialog}
        id="inquiry-dialog"
        className="inquiry-dialog"
        aria-labelledby="inquiry-title"
        aria-describedby="inquiry-description"
        onClose={restoreInquiry}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeInquiry();
        }}
      >
        <div className="inquiry-dialog-heading">
          <div>
            <h2 id="inquiry-title">send an inquiry</h2>
          </div>
          <button
            className="icon-button inquiry-close"
            type="button"
            onClick={closeInquiry}
            aria-label="Close message form"
          >
            <X size={20} />
          </button>
        </div>
        <p id="inquiry-description" className="inquiry-description">
          Share a few details about your inquiry.
        </p>
        <form className="inquiry-form" noValidate onSubmit={submitInquiry}>
          <div className="inquiry-fields">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">
                first name <span className="inquiry-required" aria-hidden="true">*</span>
              </label>
              <input
                ref={inquiryName}
                autoComplete="given-name"
                id="inquiry-name"
                name="name"
                placeholder="e.g. John"
                required
              />
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-last-name">
                last name <span className="inquiry-required" aria-hidden="true">*</span>
              </label>
              <input
                autoComplete="family-name"
                id="inquiry-last-name"
                name="lastName"
                placeholder="e.g. Smith"
                required
              />
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-email">
                email <span className="inquiry-required" aria-hidden="true">*</span>
              </label>
              <input
                autoComplete="email"
                id="inquiry-email"
                name="email"
                placeholder="e.g. name@company.com"
                type="email"
                required
              />
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-company">company / organization</label>
              <input
                autoComplete="organization"
                id="inquiry-company"
                name="company"
                placeholder="e.g. Acme, Inc. (optional)"
              />
            </div>
            <div className="inquiry-field inquiry-field-full">
              <label htmlFor="inquiry-message">
                what can I help with? <span className="inquiry-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                placeholder="e.g. a project, collaboration, or opportunity"
                rows={5}
                required
              />
            </div>
          </div>
          <label className="inquiry-resume" htmlFor="inquiry-request-resume">
            <input id="inquiry-request-resume" name="requestResume" type="checkbox" />
            <span>request a résumé</span>
          </label>
          <div className="inquiry-actions">
            <button className="inquiry-submit" type="submit">
              send inquiry <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
          {showInquiryStatus && (
            <p className="inquiry-status" role="status">
              Inquiry submissions are not yet supported. This feature is in progress, and your
              message has not been sent.
            </p>
          )}
        </form>
      </dialog>
    </>
  );
}
