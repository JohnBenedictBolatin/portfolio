import { ArrowUpRight } from 'lucide-react';
import type { Credential } from '@/data/credentials';
import { CredentialCard } from '@/components/credential-card';

const credentialGroups = [
  {
    id: 'networking-cybersecurity',
    title: 'Networking & Cybersecurity',
    issuers: ['Appkademiya', 'Cisco'],
  },
  {
    id: 'ai-business',
    title: 'AI, CRM & Business',
    issuers: ['IBM SkillsBuild', 'LinkedIn Learning'],
  },
  {
    id: 'salesforce-trailhead',
    title: 'Salesforce Trailhead',
    issuers: ['Salesforce Trailhead'],
  },
] as const;

function byDateThenTitle(left: Credential, right: Credential) {
  const dateOrder = (right.issuedOn ?? '').localeCompare(left.issuedOn ?? '');
  return dateOrder || left.title.localeCompare(right.title);
}

export function CredentialCollection({ credentials }: { credentials: Credential[] }) {
  const groups = credentialGroups
    .map((group) => ({
      ...group,
      credentials: credentials
        .filter((credential) => group.issuers.some((issuer) => credential.issuer === issuer))
        .toSorted((left, right) => {
          const issuerOrder =
            group.issuers.findIndex((issuer) => issuer === left.issuer) -
            group.issuers.findIndex((issuer) => issuer === right.issuer);
          return issuerOrder || byDateThenTitle(left, right);
        }),
    }))
    .filter((group) => group.credentials.length > 0);

  return (
    <>
      <div className="credential-sections">
        {groups.map((group) => {
          const isSalesforceGroup = group.id === 'salesforce-trailhead';
          const sectionId = `credentials-${group.id}`;

          return (
            <section
              className={`credential-section${isSalesforceGroup ? ' credential-section--salesforce' : ''}`}
              key={group.id}
              aria-labelledby={sectionId}
            >
              <div className="credential-section-heading-row">
                <h2 className="credential-section-heading" id={sectionId}>
                  {group.title}
                </h2>
                {isSalesforceGroup && (
                  <a
                    className="credential-trailhead-link"
                    href="https://www.salesforce.com/trailblazer/stqarwvywg3zzlktnq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-underline-label">Trailhead profile</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
              <ul className="credential-grid" aria-label={`${group.title} credentials`}>
                {group.credentials.map((credential) => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
