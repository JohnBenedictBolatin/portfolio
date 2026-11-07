import Image from 'next/image';
import { ProjectPreviewInteraction } from './project-preview-interaction';

type PreviewImage = { src: string; alt: string };

function PreviewSurface({
  preview,
  pageNumber,
  sizes,
}: {
  preview: PreviewImage | null;
  pageNumber: number;
  sizes: string;
}) {
  return preview ? (
    <Image
      src={preview.src}
      alt={preview.alt}
      fill
      sizes={sizes}
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
  imageSizes = '(max-width: 639px) 70vw, 240px',
  showHoverMascot = false,
}: {
  title: string;
  previews: PreviewImage[];
  imageSizes?: string;
  showHoverMascot?: boolean;
}) {
  const cards = Array.from({ length: 3 }, (_, index) => previews[index] ?? null);
  const carouselCards = cards
    .map((preview, index) => ({ preview, pageNumber: index + 1 }))
    .reverse();

  const label = `${title} project previews${previews.length ? '' : ', screenshots not added yet'}`;
  const content = (
    <>
      {cards.map((preview, index) => (
        <div className="project-preview-card" key={`${preview?.src ?? 'placeholder'}-${index}`}>
          <PreviewSurface preview={preview} pageNumber={index + 1} sizes={imageSizes} />
        </div>
      ))}
      <div className="project-preview-marquee" aria-hidden="true">
        <div className="project-preview-marquee-track">
          {[0, 1].map((copyIndex) => (
            <div className="project-preview-marquee-set" key={`preview-set-${copyIndex}`}>
              {carouselCards.map(({ preview, pageNumber }) => (
                <div
                  className="project-preview-marquee-slot"
                  key={`${copyIndex}-${preview?.src ?? 'placeholder'}-${pageNumber}`}
                >
                  <div className="project-preview-marquee-card">
                    <PreviewSurface preview={preview} pageNumber={pageNumber} sizes={imageSizes} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return showHoverMascot ? (
    <ProjectPreviewInteraction label={label}>{content}</ProjectPreviewInteraction>
  ) : (
    <div className="project-preview-stack" role="group" aria-label={label}>
      {content}
    </div>
  );
}
