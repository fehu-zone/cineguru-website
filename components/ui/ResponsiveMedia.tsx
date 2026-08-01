export function ProjectPoster({ slug, alt, sizes }: { slug: string; alt: string; sizes: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/assets/projects/${slug}-640.avif 640w, /assets/projects/${slug}-1280.avif 1280w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/assets/projects/${slug}-640.webp 640w, /assets/projects/${slug}-1280.webp 1280w`}
        sizes={sizes}
      />
      <img
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        src={`/assets/projects/${slug}-1280.webp`}
        width="1280"
        height="720"
        loading="lazy"
        decoding="async"
        alt={alt}
      />
    </picture>
  );
}

export function ReelPoster({ slug, alt, sizes }: { slug: string; alt: string; sizes: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/assets/reels/${slug}-540.avif 540w, /assets/reels/${slug}-1080.avif 1080w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/assets/reels/${slug}-540.webp 540w, /assets/reels/${slug}-1080.webp 1080w`}
        sizes={sizes}
      />
      <img
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        src={`/assets/reels/${slug}-1080.webp`}
        width="1080"
        height="1920"
        loading="lazy"
        decoding="async"
        alt={alt}
      />
    </picture>
  );
}
