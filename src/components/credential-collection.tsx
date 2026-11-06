import { ArrowUpRight } from 'lucide-react';
import type { Credential } from '@/data/credentials';
import { CredentialCard } from '@/components/credential-card';

function byDateThenTitle(left: Credential, right: Credential) {
  const dateOrder = (right.issuedOn ?? '').localeCompare(left.issuedOn ?? '');
  return dateOrder || left.title.localeCompare(right.title);
}

function groupByIssuer(credentials: Credential[]) {
  const groups = new Map<string, Credential[]>();

  for (const credential of credentials) {
    const group = groups.get(credential.issuer) ?? [];
    group.push(credential);
    groups.set(credential.issuer, group);
  }

  return Array.from(groups, ([issuer, groupCredentials]) => ({
    issuer,
    credentials: groupCredentials.toSorted(byDateThenTitle),
  })).toSorted((left, right) => {
    const leftIsSalesforce = left.issuer === 'Salesforce Trailhead';
    const rightIsSalesforce = right.issuer === 'Salesforce Trailhead';
    if (leftIsSalesforce !== rightIsSalesforce) return leftIsSalesforce ? -1 : 1;
    return left.issuer.localeCompare(right.issuer);
  });
}

export function CredentialCollection({
  certifications,
  others,
}: {
  certifications: Credential[];
  others: Credential[];
}) {
  const otherGroups = groupByIssuer(others);

  return (
    <div className="credential-sections">
      <section className="credential-section" aria-labelledby="credentials-certifications">
        <div className="credential-section-heading-row">
          <h2 className="credential-section-heading" id="credentials-certifications">
            Certifications
          </h2>
        </div>
        <ul className="credential-grid" aria-label="Certifications">
          {certifications.toSorted(byDateThenTitle).map((credential) => (
            <CredentialCard key={credential.id} credential={credential} />
          ))}
        </ul>
      </section>
      <section className="credential-section" aria-labelledby="credentials-others">
        <div className="credential-section-heading-row">
          <h2 className="credential-section-heading" id="credentials-others">
            Others
          </h2>
        </div>
        <div className="credential-sections">
          {otherGroups.map((group) => {
            const isSalesforceGroup = group.issuer === 'Salesforce Trailhead';
            const isLinkedInGroup = group.issuer === 'LinkedIn Learning';
            const isCarouselGroup = isSalesforceGroup || isLinkedInGroup;
            const sectionId = `credentials-others-${group.issuer
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')}`;
            const renderCredentials = (copyIndex = 0) =>
              group.credentials.map((credential) => (
                <CredentialCard key={`${copyIndex}-${credential.id}`} credential={credential} />
              ));

            return (
              <section
                className={`credential-section${
                  isSalesforceGroup ? ' credential-section--salesforce' : ''
                }${isCarouselGroup ? ' credential-section--carousel' : ''}${
                  isLinkedInGroup ? ' credential-section--linkedin' : ''
                }`}
                key={group.issuer}
                aria-labelledby={sectionId}
              >
                <div className="credential-section-heading-row">
                  <h3
                    className="credential-section-heading credential-subsection-heading"
                    id={sectionId}
                  >
                    {group.issuer}
                  </h3>
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
                {isCarouselGroup ? (
                  <div
                    className="credential-marquee"
                    role="region"
                    aria-labelledby={sectionId}
                    tabIndex={0}
                  >
                    <div className="credential-marquee-track">
                      {[0, 1].map((copyIndex) => (
                        <ul
                          className="credential-grid credential-marquee-list"
                          key={`${group.issuer}-credentials-${copyIndex}`}
                          aria-label={`${group.issuer} credentials`}
                          aria-hidden={copyIndex === 1}
                          inert={copyIndex === 1}
                        >
                          {renderCredentials(copyIndex)}
                        </ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ul className="credential-grid" aria-label={`${group.issuer} credentials`}>
                    {renderCredentials()}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
