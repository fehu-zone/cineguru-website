export const siteConfig = {
  name: "Cineguru Studio",
  url: "https://www.wearecineguru.com",
  email: "info@wearecineguru.com",
  phoneDisplay: "+90 531 844 62 06",
  phoneHref: "tel:+905318446206",
  address: {
    street: "Caferağa Mah. Şifa Sk. No: 19",
    locality: "Kadıköy",
    region: "İstanbul",
    country: "TR",
  },
  themeColor: "#0b0b0c",
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
  { key: "method", href: "#method" },
  { key: "contact", href: "#contact" },
] as const;

export const projects = [
  { id: "sifir-atik", slug: "sifir-atik", youtubeId: "qG5OExBLt8c", year: "2026", featured: true },
  { id: "vex-robotics", slug: "vex-robotics", youtubeId: "aZrWhEaHDBg", year: "2026", featured: true },
  { id: "kalekim", slug: "kalekim", youtubeId: "Mz5axZ1atJk", year: "2024", featured: false },
  { id: "vialand", slug: "vialand", youtubeId: "DtZNVI2ON-U", year: "2024", featured: false },
  { id: "etnospor", slug: "etnospor", youtubeId: "YNDz9ydGqPM", year: "2024", featured: false },
  { id: "asfat", slug: "asfat", youtubeId: "bct_ERqomNI", year: "2024", featured: false },
] as const;

export const reels = [
  { id: "alfemo-masko", slug: "alfemo-masko", youtubeId: "zgHJxbfs27o", year: "2026" },
  { id: "sifir-atik-festival", slug: "sifir-atik-festival", youtubeId: "t7DJjnegikA", year: "2026" },
] as const;

export const brands = [
  { label: "ASFAT", id: "asfat", logo: "/assets/references/Asfat.webp" },
  { label: "BiBOYA", id: "biboya", logo: "/assets/references/BiBOYA-1.webp" },
  { label: "BOSAD", id: "bosad", logo: "/assets/references/Bosad.webp" },
  { label: "Farmasi", id: "farmasi", logo: "/assets/references/farmasi-1.webp" },
  { label: "Kalekim", id: "kalekim", logo: "/assets/references/Kalekim.webp" },
  { label: "Pasha Bank", id: "pasha-bank", logo: "/assets/references/Pasha-Bank.webp" },
  { label: "RTA", id: "rta", logo: "/assets/references/RTA-1-1.webp" },
  { label: "Vasso", id: "vasso", logo: "/assets/references/Vasso.webp" },
  { label: "Vialand", id: "vialand", logo: "/assets/references/Vialand.webp" },
  { label: "Vodafone", id: "vodafone", logo: "/assets/references/Vodafone.webp" },
  { label: "World Ethnosport", id: "world-ethnosport", logo: "/assets/references/World-Ethnosport.webp" },
  { label: "World Nomad Games", id: "world-nomad-games", logo: "/assets/references/World-Nomad-Games.webp" },
  { label: "Sıfır Atık Vakfı", id: "sifir-atik-vakfi", logo: "/assets/references/sifir-atik-vakfi.webp" },
] as const;

export const methodPhases = [
  { code: "01", mode: "direct", image: "/assets/method-direction-v6.webp" },
  { code: "02", mode: "generate", image: "/assets/method-generation-v6.webp" },
  { code: "03", mode: "film", image: "/assets/method-filmcraft-v6.webp" },
] as const;
