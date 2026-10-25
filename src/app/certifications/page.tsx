import { PageHeading } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { CredentialCollection } from '@/components/credential-collection';
import { publishedCredentials } from '@/data/credentials';

export const metadata = pageMetadata(
  'Certifications',
  'Certificates and badges across Salesforce, AI, networking, and business.',
  '/certifications',
);

export default function CertificationsPage() {
  return (
    <>
      <PageHeading
        title="certifications"
        description="Certificates and badges across Salesforce, AI, networking, and business."
        visual={<ChromeSectionIcon index="05" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        <CredentialCollection credentials={publishedCredentials} />
      </div>
    </>
  );
}
