import { TextLink } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">[ error: 404 ]</p>
      <h1>page not found.</h1>
      <p>This path doesn’t lead anywhere. Let’s get you back on track.</p>
      <TextLink href="/">back to home</TextLink>
    </section>
  );
}
