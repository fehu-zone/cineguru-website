export const siteConfig = {
  name: "Cineguru Studio",
  url: "https://www.wearecineguru.com",
  email: "info@wearecineguru.com",
  phoneDisplay: "+90 531 844 62 06",
  phoneHref: "tel:+905318446206",
  whatsappHref: "https://wa.me/905318446206",
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
  { id: "etnospor-festivali", slug: "etnospor", youtubeId: "YgTxEe4HDbo", year: "2026", featured: true },
  { id: "sifir-atik-blueaware", slug: "sifir-atik", youtubeId: "YMRjZhdPsfk", year: "2026", featured: true },
  { id: "cineguru-showreel", slug: "showreel", youtubeId: "7B39eWsDc5s", year: "2026", featured: true },
  { id: "kalekim", slug: "kalekim", youtubeId: "Mz5axZ1atJk", year: "2024", featured: true },
  { id: "vialand", slug: "vialand", youtubeId: "DtZNVI2ON-U", year: "2024", featured: true },
  { id: "asfat", slug: "asfat", youtubeId: "bct_ERqomNI", year: "2024", featured: true },
  { id: "sifir-atik", slug: "sifir-atik", youtubeId: "qG5OExBLt8c", year: "2026", featured: true },
  { id: "vex-robotics", slug: "vex-robotics", youtubeId: "aZrWhEaHDBg", year: "2026", featured: true },
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
  { label: "Vodafone", id: "vodafone", logo: "/assets/references/Vodafone.webp", scale: 1.25 },
  { label: "Sıfır Atık Vakfı", id: "sifir-atik-vakfi", logo: "/assets/references/sifir-atik-vakfi.webp", scale: 1.3 },
  { label: "TurkNet", id: "turknet", logo: "/assets/references/turknet.webp", scale: 1.15 },
  { label: "Hesap.com", id: "hesapno", logo: "/assets/references/hesap-basit.webp", scale: 1.1 },
  { label: "World Ethnosport", id: "world-ethnosport", logo: "/assets/references/World-Ethnosport.webp", scale: 1.35 },
  { label: "Kalekim", id: "kalekim", logo: "/assets/references/Kalekim.webp", scale: 1.05 },
  { label: "Farmasi", id: "farmasi", logo: "/assets/references/farmasi-1.webp", scale: 1.0 },
  { label: "Vasso", id: "vasso", logo: "/assets/references/Vasso.webp", scale: 1.35 },
  { label: "ASFAT", id: "asfat", logo: "/assets/references/Asfat.webp", scale: 0.9 },
  { label: "Pasha Bank", id: "pasha-bank", logo: "/assets/references/Pasha-Bank.webp", scale: 1.3 },
  { label: "Vialand", id: "vialand", logo: "/assets/references/Vialand.webp", scale: 0.85 },
  { label: "BOSAD", id: "bosad", logo: "/assets/references/Bosad.webp", scale: 1.35 },
  { label: "World Nomad Games", id: "world-nomad-games", logo: "/assets/references/World-Nomad-Games.webp", scale: 1.35 },
  { label: "RTA", id: "rta", logo: "/assets/references/RTA-1-1.webp", scale: 0.95 },
] as const;

export const methodPhases = [
  { code: "01", mode: "direct", image: "/assets/method-direction-v6.webp" },
  { code: "02", mode: "generate", image: "/assets/method-generation-v6.webp" },
  { code: "03", mode: "film", image: "/assets/method-filmcraft-v6.webp" },
] as const;
