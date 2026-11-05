import { Section } from "@/components/landing/section-shell";

type MediaGalleryProps = {
  images: string[];
  title?: string;
  description?: string;
};

export function MediaGallery({ images, title = "Media", description }: MediaGalleryProps) {
  const list = (images ?? []).filter(Boolean);
  if (list.length === 0) return null;

  return (
    <Section id="media" eyebrow="Media" title={title} description={description}>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${url}-${i}`}
            src={url}
            alt={`${title} screenshot ${i + 1}`}
            className="w-full rounded-xl border border-border/60 object-cover"
          />
        ))}
      </div>
    </Section>
  );
}
