import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 672px"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
function Diagram({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure>
      <div className="diagram-scroll" role="img" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Figure,
    Diagram,
    a: ({ href, children, ...props }) => {
      if (!href || !/^(https?:\/\/|mailto:|\/(?!\/)|#)/.test(href)) return <span>{children}</span>;
      return (
        <a
          {...props}
          href={href}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
    table: (props) => (
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table {...props} />
      </div>
    ),
    pre: (props) => <pre {...props} tabIndex={0} />,
    ...components,
  };
}
