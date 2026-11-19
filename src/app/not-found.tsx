import { ErrorState } from '@/components/error-state';

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="page not found."
      description="This path doesn't lead anywhere. Let's get you back on track."
    />
  );
}
