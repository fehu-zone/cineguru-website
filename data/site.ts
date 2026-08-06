export const siteConfig = {
  name: "Cineguru Studio",
  url: "https://www.wearecineguru.com",
  email: "info@wearecineguru.com",
  phoneDisplay: "+90 531 844 62 06",
  phoneHref: "tel:+905318446206",
  whatsappHref: "https://wa.me/905318446206",
  getWhatsappHref(locale: "tr" | "en" = "tr") {
    const text = locale === "en"
      ? "Hello, welcome to Cineguru! 👋 How can we help you today?"
      : "Merhaba, Cineguru'ya hoş geldiniz! 👋 Size nasıl yardımcı olabiliriz?";
    return `https://wa.me/905318446206?text=${encodeURIComponent(text)}`;
  },
  address: {
    street: "Caferağa Mah. Şifa Sk. No: 19",
    locality: "Kadıköy",
    region: "İstanbul",
    country: "TR",
  },
  themeColor: "#141414",
  showreel: {
    id: "C9U3RJX1c0k",
    video: "/assets/Cineguru-Production-Showreel.mp4",
    poster: "/assets/showreel-poster-1280.webp",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/cinegurustudio/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/thecineguru" },
    { label: "YouTube", href: "https://www.youtube.com/@CineguruStudio" },
  ],
} as const;

export const navigationItems = [
  { key: "work", href: "#work" },
  { key: "services", href: "#services" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

export const projects = [
  { id: "etnospor-festivali", slug: "etnospor-festivali", youtubeId: "YgTxEe4HDbo", year: "2026", featured: true },
  { id: "sifir-atik", slug: "sifir-atik", youtubeId: "qG5OExBLt8c", year: "2026", featured: true },
  { id: "sifir-atik-blueaware", slug: "sifir-atik-blueaware", youtubeId: "YMRjZhdPsfk", year: "2026", featured: true },
  { id: "vex-robotics", slug: "vex-robotics", youtubeId: "aZrWhEaHDBg", year: "2026", featured: true },
  { id: "cineguru-showreel", slug: "cineguru-showreel", youtubeId: "7B39eWsDc5s", year: "2026", featured: true },
] as const;

export const aboutVideos = [
  { id: "tek-yaratici-yon", video: "/assets/videos/tek-yaratici-yon.mov" },
  { id: "hibrit-uretim", video: "/assets/videos/hibrit-uretim.mov" },
  { id: "her-ekrana-hazir", video: "/assets/videos/her-ekrana-hazir.mov" },
  { id: "iz-birakan-final", video: "/assets/videos/iz-birakan-final.mov" },
] as const;

export const reels = [
  { id: "alfemo-masko", slug: "alfemo-masko", youtubeId: "zgHJxbfs27o", year: "2026" },
  { id: "sifir-atik-festival", slug: "sifir-atik-festival", youtubeId: "t7DJjnegikA", year: "2026" },
] as const;

export const brands = [
  { label: "Sıfır Atık Vakfı", id: "sifir-atik-vakfi", logo: "/assets/references/sifir-atik-vakfi.webp", scale: 1.2 },
  { label: "ASFAT", id: "asfat", logo: "/assets/references/Asfat.webp", scale: 1.0 },
  { label: "Bi'Boya", id: "biboya", logo: "/assets/references/BiBOYA-1.webp", scale: 1.1 },
  { label: "BOSAD", id: "bosad", logo: "/assets/references/Bosad.webp", scale: 1.1 },
  { label: "Farmasi", id: "farmasi", logo: "/assets/references/farmasi-1.webp", scale: 1.0 },
  { label: "Kalekim", id: "kalekim", logo: "/assets/references/Kalekim.webp", scale: 1.05 },
  { label: "Pasha Bank", id: "pasha-bank", logo: "/assets/references/Pasha-Bank.webp", scale: 1.2 },
  { label: "RTA", id: "rta", logo: "/assets/references/RTA-1-1.webp", scale: 1.0 },
  { label: "Vasso", id: "vasso", logo: "/assets/references/Vasso.webp", scale: 1.2 },
  { label: "Vialand", id: "vialand", logo: "/assets/references/Vialand.webp", scale: 1.0 },
  { label: "Vodafone", id: "vodafone", logo: "/assets/references/Vodafone.webp", scale: 1.15 },
  { label: "World Ethnosport", id: "world-ethnosport", logo: "/assets/references/World-Ethnosport.webp", scale: 1.2 },
  { label: "World Nomad Games", id: "world-nomad-games", logo: "/assets/references/World-Nomad-Games.webp", scale: 1.2 },
  { label: "Istanbul Airport", id: "iga", logo: "/assets/references/iga.webp", scale: 1.1 },
] as const;

export const methodPhases = [
  { code: "01", mode: "direct", image: "/assets/method-direction-v6.webp" },
  { code: "02", mode: "generate", image: "/assets/method-generation-v6.webp" },
  { code: "03", mode: "film", image: "/assets/method-filmcraft-v6.webp" },
] as const;
