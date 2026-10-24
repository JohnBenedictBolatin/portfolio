import Image from 'next/image';

type PreviewImage = { src: string; alt: string };

function PreviewSurface({
  preview,
  pageNumber,
}: {
  preview: PreviewImage | null;
  pageNumber: number;
}) {
  return preview ? (
    <Image
      src={preview.src}
      alt={preview.alt}
      fill
      sizes="(max-width: 639px) 70vw, 240px"
      className="project-preview-image"
    />
  ) : (
    <div className="project-preview-placeholder" aria-hidden="true">
      <span className="project-preview-placeholder-mark" />
      <span className="project-preview-placeholder-label">
        preview {String(pageNumber).padStart(2, '0')} · pending
      </span>
    </div>
  );
}

export function ProjectPreviewStack({
  title,
  previews,
}: {
  title: string;
  previews: PreviewImage[];
}) {
  const cards = Array.from({ length: 3 }, (_, index) => previews[index] ?? null);

  return (
    <div
      className="project-preview-stack"
      role="group"
      aria-label={`${title} project previews${previews.length ? '' : ', screenshots not added yet'}`}
    >
      {cards.map((preview, index) => (
        <div className="project-preview-card" key={`${preview?.src ?? 'placeholder'}-${index}`}>
          <PreviewSurface preview={preview} pageNumber={index + 1} />
          {index === 1 && (
            <div className="project-preview-carousel" aria-hidden="true">
              {cards.map((page, pageIndex) => (
                <div
                  className="project-preview-slide"
                  key={`${page?.src ?? 'placeholder'}-${pageIndex}`}
                >
                  <PreviewSurface preview={page} pageNumber={pageIndex + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
