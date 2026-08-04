import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.wearecineguru.com";
  const now = new Date();

  return [
    // ── Anasayfa (TR) ──────────────────────────────────
    {
      url: `${base}/tr`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { tr: `${base}/tr`, en: `${base}/en` } },
      videos: [
        {
          title: "Cineguru Studio — Production Showreel",
          thumbnail_loc: `${base}/assets/showreel-poster-1280.webp`,
          description:
            "Cineguru Studio prodüksiyon showreel — Reklam filmleri, marka hikâyeleri, etkinlik filmleri ve sosyal medya içerikleri.",
          content_loc: `${base}/assets/Cineguru-Production-Showreel.mp4`,
          player_loc: "https://www.youtube.com/embed/C9U3RJX1c0k",
          duration: 90,
          family_friendly: "yes" as const,
          requires_subscription: "no" as const,
        },
      ],
    },
    // ── Anasayfa (EN) ──────────────────────────────────
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { tr: `${base}/tr`, en: `${base}/en` } },
      videos: [
        {
          title: "Cineguru Studio — Production Showreel",
          thumbnail_loc: `${base}/assets/showreel-poster-1280.webp`,
          description:
            "Cineguru Studio production showreel — Commercial films, brand stories, event coverage and social media content.",
          content_loc: `${base}/assets/Cineguru-Production-Showreel.mp4`,
          player_loc: "https://www.youtube.com/embed/C9U3RJX1c0k",
          duration: 90,
          family_friendly: "yes" as const,
          requires_subscription: "no" as const,
        },
      ],
    },
    // ── Hakkımızda (TR) ────────────────────────────────
    {
      url: `${base}/tr/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${base}/tr/about`, en: `${base}/en/about` } },
    },
    // ── About (EN) ─────────────────────────────────────
    {
      url: `${base}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { tr: `${base}/tr/about`, en: `${base}/en/about` } },
    },
    // ── Gizlilik Politikası (TR) ───────────────────────
    {
      url: `${base}/tr/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { tr: `${base}/tr/privacy`, en: `${base}/en/privacy` } },
    },
    // ── Privacy Policy (EN) ────────────────────────────
    {
      url: `${base}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { tr: `${base}/tr/privacy`, en: `${base}/en/privacy` } },
    },
  ];
}
