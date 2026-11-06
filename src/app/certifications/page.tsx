import { PageHeading } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';
import { ChromeSectionIcon } from '@/components/chrome-section-icon';
import { CredentialCollection } from '@/components/credential-collection';
import { publishedCertifications, publishedOtherCredentials } from '@/data/credentials';

const description =
  'A growing record of what I’m learning as technology and work continue to evolve.';

export const metadata = pageMetadata(
  'Certifications',
  description,
  '/certifications',
);

export default function CertificationsPage() {
  return (
    <>
      <PageHeading
        title="certifications"
        description={description}
        visual={<ChromeSectionIcon index="05" className="page-title-chrome-icon" size={48} />}
      />
      <div className="page-body">
        <CredentialCollection
          certifications={publishedCertifications}
          others={publishedOtherCredentials}
        />
      </div>
    </>
  );
}
