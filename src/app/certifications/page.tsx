import { EmptyState, PageHeading } from '@/components/ui';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Certifications',
  'Courses and credentials in John Benedict Bolatin’s portfolio.',
  '/certifications',
);

export default function CertificationsPage() {
  return (
    <>
      <PageHeading
        index="05"
        title="certifications"
        description="A place for certificates, courses, and professional credentials."
      />
      <div className="page-body">
        <EmptyState label="nothing listed yet">
          Certifications will appear here as I add and verify them.
        </EmptyState>
      </div>
    </>
  );
}
