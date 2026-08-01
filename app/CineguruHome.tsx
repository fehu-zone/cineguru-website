"use client";

/* eslint-disable @next/next/no-img-element -- native picture/srcset and exact YouTube poster URLs are intentional */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const projectData = [
  {
    title: "Sıfır Atık Haftası",
    type: { tr: "Reklam Filmi", en: "Commercial Film" },
    year: "2026",
    alt: { tr: "Sıfır Atık Haftası reklam filmi — Cineguru Studio", en: "Zero Waste Week commercial — Cineguru Studio" },
    youtubeId: "qG5OExBLt8c",
    slug: "sifir-atik",
    featuredCase: true,
    caseStudy: {
      tr: [
        ["Film odağı", "Sıfır Atık Haftası mesajını kısa, net ve hatırlanabilir bir reklam filmine taşımak."],
        ["Üretim sistemi", "Mesaj, ritim ve görsel devamlılığı tek bir film akışında buluşturan hibrit prodüksiyon."],
        ["Yayın", "Cineguru Studio YouTube · 2026"],
      ],
      en: [
        ["Film focus", "Turn the Zero Waste Week message into a concise, memorable commercial film."],
        ["Production system", "A hybrid production that brings message, rhythm and visual continuity into one film flow."],
        ["Release", "Cineguru Studio YouTube · 2026"],
      ],
    },
  },
  {
    title: "VEX Robotics Türkiye",
    type: { tr: "Tanıtım Filmi", en: "Brand Film" },
    year: "2026",
    alt: { tr: "VEX Robotics Türkiye tanıtım filmi — Cineguru Studio", en: "VEX Robotics Türkiye brand film — Cineguru Studio" },
    youtubeId: "aZrWhEaHDBg",
    slug: "vex-robotics",
    featuredCase: true,
    caseStudy: {
      tr: [
        ["Film odağı", "VEX Robotics Türkiye’nin eğitim ve teknoloji dünyasını dinamik bir tanıtım filmiyle görünür kılmak."],
        ["Üretim sistemi", "Teknoloji temasını güçlü kurgu ritmi ve net marka anlatısıyla birleştiren film yaklaşımı."],
        ["Yayın", "Cineguru Studio YouTube · 2026"],
      ],
      en: [
        ["Film focus", "Make the education and technology world of VEX Robotics Türkiye visible through a dynamic brand film."],
        ["Production system", "A film approach combining the technology theme with a strong edit rhythm and clear brand narrative."],
        ["Release", "Cineguru Studio YouTube · 2026"],
      ],
    },
  },
  {
    title: "Kalekim 50. Yıl",
    type: { tr: "Reklam Filmi", en: "Commercial Film" },
    year: "2024",
    alt: { tr: "Kalekim 50. Yıl — Cineguru filmi", en: "Kalekim 50th Anniversary — Cineguru film" },
    youtubeId: "Mz5axZ1atJk",
    slug: "kalekim",
    featuredCase: false,
    caseStudy: null,
  },
  {
    title: "Vialand",
    type: { tr: "3D Reklam Filmi", en: "3D Commercial" },
    year: "2024",
    alt: { tr: "Vialand — Cineguru filmi", en: "Vialand — Cineguru film" },
    youtubeId: "DtZNVI2ON-U",
    slug: "vialand",
    featuredCase: false,
    caseStudy: null,
  },
  {
    title: "Etnospor Kültür Festivali",
    type: { tr: "Festival Filmi", en: "Festival Film" },
    year: "2024",
    alt: { tr: "Etnospor Kültür Festivali — Cineguru filmi", en: "Ethnosport Culture Festival — Cineguru film" },
    youtubeId: "YNDz9ydGqPM",
    slug: "etnospor",
    featuredCase: false,
    caseStudy: null,
  },
  {
    title: "ASFAT — PN MİLGEM",
    type: { tr: "Tanıtım Filmi", en: "Brand Film" },
    year: "2024",
    alt: { tr: "ASFAT — PN MİLGEM — Cineguru filmi", en: "ASFAT — PN MİLGEM — Cineguru film" },
    youtubeId: "bct_ERqomNI",
    slug: "asfat",
    featuredCase: false,
    caseStudy: null,
  },
];

const reelsData = [
  {
    title: { tr: "Alfemo Masko", en: "Alfemo Masko" },
    type: { tr: "Dikey Reel", en: "Vertical Reel" },
    year: "2026",
    alt: {
      tr: "Alfemo Masko için hazırlanan dikey video içeriği — Cineguru Studio",
      en: "Vertical video content created for Alfemo Masko — Cineguru Studio",
    },
    youtubeId: "zgHJxbfs27o",
    slug: "alfemo-masko",
  },
  {
    title: { tr: "Sıfır Atık Festivali", en: "Zero Waste Festival" },
    type: { tr: "Sosyal Medya İçeriği", en: "Social Content" },
    year: "2026",
    alt: {
      tr: "Sıfır Atık Festivali için hazırlanan dikey sosyal medya içeriği — Cineguru Studio",
      en: "Vertical social media content created for Zero Waste Festival — Cineguru Studio",
    },
    youtubeId: "t7DJjnegikA",
    slug: "sifir-atik-festival",
  },
];

const services = [
  {
    no: "01",
    title: { tr: "Strateji", en: "Strategy" },
    text: {
      tr: "Markanın asıl meselesini bulur, fikri izleyicinin hatırlayacağı bir anlatıya dönüştürürüz.",
      en: "We find the brand's real challenge and turn the idea into a story audiences remember.",
    },
    tags: { tr: ["Yaratıcı Yönetmenlik", "Kampanya", "Konsept"], en: ["Creative Direction", "Campaign", "Concept"] },
  },
  {
    no: "02",
    title: { tr: "Pre Production", en: "Pre Production" },
    text: {
      tr: "Senaryo, görsel dünya, karakter devamlılığı ve storyboard sürecini yapay zekâ ile hızlandırırız.",
      en: "We accelerate scripts, visual worlds, character continuity and storyboards with AI.",
    },
    tags: { tr: ["Senaryo", "AI Görsel", "Storyboard"], en: ["Script", "AI Visuals", "Storyboard"] },
  },
  {
    no: "03",
    title: { tr: "Production + AI Video", en: "Production + AI Video" },
    text: {
      tr: "Canlı çekim ile üretken yapay zekâyı tek bir yönetmenlik ve görüntü dili altında buluştururuz.",
      en: "We unite live action and generative AI under one directing and cinematography language.",
    },
    tags: { tr: ["Canlı Çekim", "AI Film", "Stüdyo"], en: ["Live Action", "AI Film", "Studio"] },
  },
  {
    no: "04",
    title: { tr: "Post Production", en: "Post Production" },
    text: {
      tr: "Kurgu, VFX, renk, ses ve format adaptasyonlarıyla her kanalda çalışan finali üretiriz.",
      en: "Editing, VFX, color, sound and format adaptations create a final that works everywhere.",
    },
    tags: { tr: ["Kurgu", "VFX", "Renk"], en: ["Editing", "VFX", "Color"] },
  },
];

const translations = {
  tr: {
    nav: ["İşler", "Hizmetler", "Yöntem", "İletişim"],
    project: "Projeni Anlat",
    eyebrow: "AI DESTEKLİ VİDEO PRODÜKSİYON · İSTANBUL",
    heroTitle: "Fikri, iz bırakan\nfilme dönüştürüyoruz.",
    heroText:
      "Reklam, tanıtım ve sosyal içeriklerde yapay zekâ ile insan yaratıcılığını aynı prodüksiyon disiplininde buluşturuyoruz.",
    heroPrimary: "İşleri keşfet",
    showreel: "Showreel",
    showreelTitle: "AI, film ve hareketin kesişiminde.",
    showreelModalTitle: "Cineguru Showreel",
    heroFoot: "FİKİR → PRODÜKSİYON → FİNAL",
    discover: "Keşfet",
    workEyebrow: "SEÇİLİ İŞLER · 01",
    workTitle: "Her marka için yeni bir görsel dil.",
    workText:
      "Fikrin ihtiyacına göre kamera, yapay zekâ, 3D ve post-prodüksiyon araçlarını aynı anlatıda birleştiriyoruz.",
    caseStudies: "GÜNCEL CASE STUDIES",
    archive: "SEÇKİ / ARŞİV",
    watch: "Filmi izle",
    channelEyebrow: "GÜNCEL AKIŞ · YOUTUBE + INSTAGRAM",
    channelTitle: "Ürettiklerimiz yayında.",
    channelText: "Yeni filmler, AI denemeleri, set arkası ve prodüksiyon günlüğü.",
    youtubeChannel: "Kanala git",
    youtubeOverline: "YOUTUBE SHORTS / GÜNCEL",
    watchReel: "Reels’i izle",
    instagramTitle: "Reels, set arkası ve yeni işler.",
    instagramLink: "Instagram’da izle",
    instagramOverline: "INSTAGRAM / STUDIO FEED",
    instagramAlt: "Cineguru Studio Instagram Reels ve set günlüğü",
    instagramAria: "Cineguru Studio Instagram hesabını aç",
    servicesEyebrow: "YETENEKLER · 02",
    servicesTitle: "Tek ekip. Uçtan uca prodüksiyon.",
    hybridEyebrow: "CINEGURU YÖNTEMİ · 03",
    hybridTitle: "İnsan sezgisi, yapay zekâ ölçeği.",
    hybridText:
      "Bizim için AI bir efekt değil; fikirden finale kadar yaratıcı kontrolü büyüten yeni bir prodüksiyon katmanı.",
    methodSystem: "CG / YARATICI SİSTEM",
    methodLive: "CANLI YÖN",
    methodTabs: "Cineguru üretim sistemi",
    processEyebrow: "SÜREÇ · 04",
    processTitle: "Karmaşıklığı biz yönetiriz.",
    steps: [
      ["Keşif", "Hedefi, izleyiciyi ve gerçek iletişim problemini birlikte tanımlarız."],
      ["Yaratıcı Sistem", "Konsept, senaryo ve görsel dünyayı tek bir yaratıcı sistemde kurarız."],
      ["Üretim", "Canlı çekim, AI ve 3D üretimi aynı kalite standardında yönetiriz."],
      ["Final & Adaptasyon", "Filmi tamamlar, tüm platformlar için güçlü varyasyonlarını üretiriz."],
    ],
    aboutEyebrow: "BİZ KİMİZ · 05",
    aboutTitle: "Set kültüründen gelen, geleceğe çalışan bir stüdyoyuz.",
    aboutText:
      "Cineguru, 2017’den beri reklam, etkinlik ve marka hikâyeleri üreten İstanbul merkezli bağımsız bir prodüksiyon stüdyosu. Geleneksel film disiplinini yeni nesil üretim teknolojileriyle birleştiriyoruz.",
    principles: [
      ["01", "Tek yaratıcı yön", "Strateji, yönetmenlik ve final aynı fikir etrafında çalışır."],
      ["02", "Hibrit üretim", "Canlı çekim, AI ve 3D yalnızca hikâye ihtiyaç duyduğunda birleşir."],
      ["03", "Her ekrana hazır", "Ana filmden dikey sosyal kurgulara kadar tek sistemde teslim ederiz."],
    ],
    brands: "Birlikte ürettiklerimiz",
    contactEyebrow: "YENİ BİR FİLM · 06",
    contactTitle: "Sıradaki hikâyeyi birlikte çekelim.",
    contactText: "Kısaca fikrinden, teslim tarihinden ve ihtiyacından bahset. Gerisini birlikte şekillendirelim.",
    mail: "Projeyi konuşalım",
    phone: "Bizi ara",
    location: "Kadıköy, İstanbul",
    address: "Caferağa Mah. Şifa Sk. No: 19 Kadıköy / İstanbul",
    emailLabel: "E-posta",
    socialLabel: "Sosyal medya",
    formName: "Ad Soyad",
    formEmail: "E-posta",
    formBrief: "Proje özeti",
    formSend: "Talebi gönder",
    formDirect: "veya doğrudan e-posta",
    formNameError: "Lütfen adınızı yazın.",
    formEmailError: "Geçerli bir e-posta adresi yazın.",
    formBriefError: "Projeyi en az 20 karakterle özetleyin.",
    formCheck: "Lütfen işaretli alanları kontrol edin.",
    formOpening: "E-posta uygulamanız açılıyor.",
    formSubject: "Cineguru Proje Talebi",
    navLabel: "Ana menü",
    homeLabel: "Cineguru ana sayfa",
    menuLabel: "Menüyü aç",
    menuCloseLabel: "Menüyü kapat",
    languageLabel: "Dil seçimi",
    skipLink: "Ana içeriğe geç",
    cursor: "İZLE",
    scrollHint: "KAYDIR / AKIŞ",
    stages: ["FİKİR", "PREVİZ", "SET", "KURGU", "RENK", "TESLİM"],
    heroTags: ["CANLI ÇEKİM", "AI VİDEO", "POST"],
    footerLine: "AI Destekli Video Prodüksiyon",
    close: "Kapat",
    caseStudyLabel: "Case Study",
  },
  en: {
    nav: ["Work", "Services", "Method", "Contact"],
    project: "Start a Project",
    eyebrow: "AI-POWERED VIDEO PRODUCTION · ISTANBUL",
    heroTitle: "We turn ideas into films\nthat leave a mark.",
    heroText:
      "We bring artificial intelligence and human creativity into one production discipline for commercials, brand films and social content.",
    heroPrimary: "Explore the work",
    showreel: "Showreel",
    showreelTitle: "Where AI, film and motion meet.",
    showreelModalTitle: "Cineguru Showreel",
    heroFoot: "IDEA → PRODUCTION → FINAL",
    discover: "Discover",
    workEyebrow: "SELECTED WORK · 01",
    workTitle: "A new visual language for every brand.",
    workText:
      "We combine camera, AI, 3D and post-production tools in one story, shaped around what the idea needs.",
    caseStudies: "LATEST CASE STUDIES",
    archive: "SELECTED ARCHIVE",
    watch: "Watch film",
    channelEyebrow: "LATEST FEED · YOUTUBE + INSTAGRAM",
    channelTitle: "Fresh from the studio.",
    channelText: "New films, AI studies, behind the scenes and production notes.",
    youtubeChannel: "Open channel",
    youtubeOverline: "YOUTUBE SHORTS / LATEST",
    watchReel: "Watch Reel",
    instagramTitle: "Reels, behind the scenes and new work.",
    instagramLink: "Watch on Instagram",
    instagramOverline: "INSTAGRAM / STUDIO FEED",
    instagramAlt: "Cineguru Studio Instagram Reels and studio diary",
    instagramAria: "Open Cineguru Studio on Instagram",
    servicesEyebrow: "CAPABILITIES · 02",
    servicesTitle: "One team. End-to-end production.",
    hybridEyebrow: "CINEGURU METHOD · 03",
    hybridTitle: "Human instinct, AI scale.",
    hybridText:
      "For us, AI is not an effect. It is a new production layer that expands creative control from first idea to final delivery.",
    methodSystem: "CG / CREATIVE SYSTEM",
    methodLive: "LIVE DIRECTION",
    methodTabs: "Cineguru production system",
    processEyebrow: "PROCESS · 04",
    processTitle: "We manage the complexity.",
    steps: [
      ["Discovery", "Together, we define the goal, the audience and the real communication problem."],
      ["Creative System", "We build the concept, script and visual world as one coherent creative system."],
      ["Production", "We direct live action, AI and 3D production to the same quality standard."],
      ["Final & Adaptation", "We finish the film and create strong variations for every platform."],
    ],
    aboutEyebrow: "ABOUT US · 05",
    aboutTitle: "Born from set culture. Built for what comes next.",
    aboutText:
      "Cineguru is an independent Istanbul production studio creating commercials, event films and brand stories since 2017. We combine traditional filmmaking discipline with next-generation production technology.",
    principles: [
      ["01", "One creative direction", "Strategy, direction and final delivery work around the same idea."],
      ["02", "Hybrid production", "Live action, AI and 3D come together only when the story calls for them."],
      ["03", "Ready for every screen", "From the master film to vertical social edits, we deliver one coherent system."],
    ],
    brands: "Brands we create with",
    contactEyebrow: "A NEW FILM · 06",
    contactTitle: "Let’s make the next story together.",
    contactText: "Tell us briefly about the idea, timing and what you need. We will shape the rest together.",
    mail: "Talk about the project",
    phone: "Call us",
    location: "Kadıköy, Istanbul",
    address: "Caferağa Mah. Şifa Sk. No: 19 Kadıköy / Istanbul",
    emailLabel: "Email",
    socialLabel: "Social",
    formName: "Full name",
    formEmail: "Email",
    formBrief: "Project brief",
    formSend: "Send inquiry",
    formDirect: "or email us directly",
    formNameError: "Please enter your name.",
    formEmailError: "Please enter a valid email address.",
    formBriefError: "Please describe the project in at least 20 characters.",
    formCheck: "Please review the highlighted fields.",
    formOpening: "Opening your email app.",
    formSubject: "Cineguru Project Inquiry",
    navLabel: "Main navigation",
    homeLabel: "Cineguru home",
    menuLabel: "Open menu",
    menuCloseLabel: "Close menu",
    languageLabel: "Language selection",
    skipLink: "Skip to main content",
    cursor: "WATCH",
    scrollHint: "SCROLL / FLOW",
    stages: ["IDEA", "PREVIS", "SET", "EDIT", "COLOR", "DELIVERY"],
    heroTags: ["LIVE ACTION", "AI VIDEO", "POST"],
    footerLine: "AI-Powered Video Production",
    close: "Close",
    caseStudyLabel: "Case Study",
  },
};

const brandNames: { label: string; id: string; logo: string }[] = [
  { label: "Sıfır Atık Vakfı", id: "sifir-atik-vakfi", logo: "/assets/references/sifir-atik-vakfi.webp" },
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
];

const methodPhases = [
  {
    code: "01",
    name: { tr: "Yön", en: "Direct" },
    detail: { tr: "Strateji, fikir ve yönetmenlik sezgisi.", en: "Strategy, concept and directorial instinct." },
    tag: { tr: "YÖN / NİYET", en: "DIRECT / INTENT" },
    mode: "direct",
    semantic: { tr: "PLAN HARİTASI · 03 KARE", en: "SHOT MAP · 03 FRAMES" },
    alt: { tr: "Yönetmenlik kararlarını ve plan akışını temsil eden üç film karesi", en: "Three film frames representing direction and shot planning" },
    image: "/assets/method-direction-v6.webp",
  },
  {
    code: "02",
    name: { tr: "Üret", en: "Generate" },
    detail: { tr: "AI ile tutarlı karakterler ve görsel dünyalar.", en: "Consistent characters and visual worlds with AI." },
    tag: { tr: "ÜRET / DÜNYA", en: "GENERATE / WORLD" },
    mode: "generate",
    semantic: { tr: "SEED LOCK · DÜNYA 02", en: "SEED LOCK · WORLD 02" },
    alt: { tr: "AI ile tutarlı bir görsel dünyanın oluşumunu temsil eden üretim sistemi", en: "A generative system representing a consistent AI visual world" },
    image: "/assets/method-generation-v6.webp",
  },
  {
    code: "03",
    name: { tr: "Film", en: "Film" },
    detail: { tr: "Kamera, hareket, kurgu, VFX ve final teslim.", en: "Camera, motion, edit, VFX and final delivery." },
    tag: { tr: "HAREKET / FİNAL", en: "MOTION / FINAL" },
    mode: "film",
    semantic: { tr: "KURGU · VFX · RENK · SES", en: "EDIT · VFX · COLOR · SOUND" },
    alt: { tr: "Kamera optiği ve final kurgu hattını temsil eden sinematik yapı", en: "A cinematic structure representing camera optics and the final edit pipeline" },
    image: "/assets/method-filmcraft-v6.webp",
  },
];

function ProjectPoster({ slug, alt, sizes }: { slug: string; alt: string; sizes: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/assets/projects/${slug}-640.avif 640w, /assets/projects/${slug}-1280.avif 1280w`} sizes={sizes} />
      <source type="image/webp" srcSet={`/assets/projects/${slug}-640.webp 640w, /assets/projects/${slug}-1280.webp 1280w`} sizes={sizes} />
      <img src={`/assets/projects/${slug}-1280.webp`} width="1280" height="720" loading="lazy" decoding="async" alt={alt} />
    </picture>
  );
}

function ReelPoster({ slug, alt, sizes }: { slug: string; alt: string; sizes: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/assets/reels/${slug}-540.avif 540w, /assets/reels/${slug}-1080.avif 1080w`} sizes={sizes} />
      <source type="image/webp" srcSet={`/assets/reels/${slug}-540.webp 540w, /assets/reels/${slug}-1080.webp 1080w`} sizes={sizes} />
      <img src={`/assets/reels/${slug}-1080.webp`} width="1080" height="1920" loading="lazy" decoding="async" alt={alt} />
    </picture>
  );
}

function trackEvent(name: string, detail: Record<string, string> = {}) {
  const payload = { event: `cineguru_${name}`, ...detail };
  window.dispatchEvent(new CustomEvent("cineguru:analytics", { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  dataLayer?.push(payload);
}

export default function CineguruHome({ initialLanguage = "tr" }: { initialLanguage?: "tr" | "en" }) {
  const language = initialLanguage;
  const [menuOpen, setMenuOpen] = useState(false);
  const [video, setVideo] = useState<{ id: string; title: string; orientation: "landscape" | "vertical" } | null>(null);
  const [methodPhase, setMethodPhase] = useState(0);
  const [formValues, setFormValues] = useState({ name: "", email: "", brief: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState("");
  const serviceRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const copy = translations[language];
  const activeMethodPhase = methodPhases[methodPhase];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.wearecineguru.com/#organization",
        name: "Cineguru Studio",
        url: `https://www.wearecineguru.com/${language}`,
        email: "info@wearecineguru.com",
        telephone: "+90 531 844 62 06",
        foundingDate: "2017",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Caferağa Mah. Şifa Sk. No: 19",
          addressLocality: "Kadıköy",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
        sameAs: [
          "https://www.instagram.com/cinegurustudio/",
          "https://www.linkedin.com/company/thecineguru",
          "https://www.youtube.com/@CineguruStudio",
        ],
      },
      {
        "@type": "VideoObject",
        name: copy.showreelModalTitle,
        description: copy.showreelTitle,
        thumbnailUrl: "https://www.wearecineguru.com/assets/showreel-poster-1280.webp",
        embedUrl: "https://www.youtube-nocookie.com/embed/C9U3RJX1c0k",
        contentUrl: "https://www.youtube.com/watch?v=C9U3RJX1c0k",
      },
    ],
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        document.documentElement.style.setProperty("--page-progress", String(progress));
        const totalFrames = Math.floor(progress * 90 * 24);
        const seconds = Math.floor(totalFrames / 24);
        const frames = totalFrames % 24;
        if (timecodeRef.current) {
          timecodeRef.current.textContent = `TC 00:${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
        }
        const service = serviceRef.current;
        if (service) {
          const start = service.offsetTop - window.innerHeight * 0.72;
          const end = service.offsetTop + service.offsetHeight - window.innerHeight * 0.32;
          const serviceProgress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
          service.style.setProperty("--service-progress", String(serviceProgress));
        }
        headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 24);
        const nextStage = Math.min(5, Math.floor(progress * 6));
        if (stageLabelRef.current) stageLabelRef.current.textContent = `0${nextStage + 1} · ${copy.stages[nextStage]}`;
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [copy.stages]);

  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => modalCloseRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideo(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      returnFocusRef.current?.focus();
    };
  }, [video]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const firstLink = navRef.current?.querySelector<HTMLAnchorElement>("a");
    const focusFrame = window.requestAnimationFrame(() => firstLink?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const interval = window.setInterval(() => setMethodPhase((phase) => (phase + 1) % methodPhases.length), 6200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    const revealAll = () => nodes.forEach((node) => node.classList.add("is-visible"));
    if (!reducedMotion) document.documentElement.classList.add("motion-ready");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -4%" },
    );
    nodes.forEach((node) => observer.observe(node));
    const fallback = window.setTimeout(revealAll, 1400);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    let frame = 0;
    const cursor = cursorRef.current;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor?.style.setProperty("--cursor-x", `${event.clientX}px`);
        cursor?.style.setProperty("--cursor-y", `${event.clientY}px`);
        const target = event.target as Element | null;
        cursor?.classList.toggle("is-watch", Boolean(target?.closest("[data-cursor-label]")));
      });
    };
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const moveMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mag-x", `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
      element.style.setProperty("--mag-y", `${(event.clientY - rect.top - rect.height / 2) * 0.1}px`);
    };
    const resetMagnet = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
    };
    magneticElements.forEach((element) => {
      element.addEventListener("pointermove", moveMagnet);
      element.addEventListener("pointerleave", resetMagnet);
    });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      magneticElements.forEach((element) => {
        element.removeEventListener("pointermove", moveMagnet);
        element.removeEventListener("pointerleave", resetMagnet);
      });
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (formValues.name.trim().length < 2) errors.name = copy.formNameError;
    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) errors.email = copy.formEmailError;
    if (formValues.brief.trim().length < 20) errors.brief = copy.formBriefError;
    setFormErrors(errors);
    if (Object.keys(errors).length) {
      setFormStatus(copy.formCheck);
      return;
    }
    const subject = encodeURIComponent(`${copy.formSubject} — ${formValues.name}`);
    const body = encodeURIComponent(`${copy.formName}: ${formValues.name}\n${copy.formEmail}: ${formValues.email}\n\n${copy.formBrief}:\n${formValues.brief}`);
    setFormStatus(copy.formOpening);
    trackEvent("contact_intent", { language });
    window.location.href = `mailto:info@wearecineguru.com?subject=${subject}&body=${body}`;
  };

  const openVideo = (id: string, title: string, orientation: "landscape" | "vertical" = "landscape") => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    trackEvent("video_open", { id, title, language });
    setVideo({ id, title, orientation });
  };

  const selectMethodPhase = (index: number) => setMethodPhase((index + methodPhases.length) % methodPhases.length);

  const handleMethodKeys = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? methodPhases.length - 1
        : index + (event.key === 'ArrowRight' ? 1 : -1);
    const normalized = (next + methodPhases.length) % methodPhases.length;
    selectMethodPhase(normalized);
    document.getElementById(`method-tab-${normalized}`)?.focus();
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main id="main-content" tabIndex={-1} aria-hidden={video ? true : undefined} inert={video ? true : undefined}>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span>{copy.cursor}</span></div>
      <header ref={headerRef} className="site-header">
        <a className="brand-link" href="#top" aria-label={copy.homeLabel}><span className="brand-logo" aria-hidden="true" /></a>
        <nav ref={navRef} className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label={copy.navLabel}>
          <a href="#work" onClick={() => setMenuOpen(false)}>{copy.nav[0]}</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>{copy.nav[1]}</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>{copy.nav[2]}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{copy.nav[3]}</a>
        </nav>
        <div className="header-actions">
          <nav className="language-toggle" aria-label={copy.languageLabel}>
            <Link href="/tr" lang="tr" hrefLang="tr" className={language === "tr" ? "active" : ""} aria-current={language === "tr" ? "page" : undefined} onClick={() => trackEvent("language_select", { language: "tr" })}>TR</Link>
            <span>·</span>
            <Link href="/en" lang="en" hrefLang="en" className={language === "en" ? "active" : ""} aria-current={language === "en" ? "page" : undefined} onClick={() => trackEvent("language_select", { language: "en" })}>EN</Link>
          </nav>
          <a className="header-cta" href="#contact" data-magnetic onClick={() => trackEvent("contact_cta", { placement: "header", language })}>{copy.project}</a>
          <button
            ref={menuButtonRef}
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.menuCloseLabel : copy.menuLabel}
          ><span /><span /></button>
        </div>
      </header>
      <button className={`menu-backdrop ${menuOpen ? "is-open" : ""}`} type="button" aria-label={copy.menuCloseLabel} onClick={() => setMenuOpen(false)} />

      <div className="scroll-filmline" aria-hidden="true">
        <span ref={stageLabelRef} className="scroll-filmline-stage">01 · {copy.stages[0]}</span>
        <div className="scroll-filmline-track"><i /></div>
        <span className="scroll-filmline-hint">{copy.scrollHint}</span>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="hero-title">
            {copy.heroTitle.split("\n").map((line) => <span className="hero-title-line" key={line}>{line}</span>)}
          </h1>
          <p className="hero-description">{copy.heroText}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work" data-magnetic>{copy.heroPrimary}<span className="button-arrow" aria-hidden="true">↓</span></a>
            <a className="text-link" href="#contact">{copy.project}<span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" />
          <div className="hero-production-frame">
            <video autoPlay muted loop playsInline preload="auto" poster="/assets/showreel-poster-1280.webp" aria-hidden="true">
              <source src="/assets/Cineguru-Production-Showreel.mp4" type="video/mp4" />
            </video>
            <div className="hero-hud" aria-hidden="true">
              <i className="hud-corner hud-tl" /><i className="hud-corner hud-tr" />
              <i className="hud-corner hud-bl" /><i className="hud-corner hud-br" />
              <div className="hud-top"><span className="hud-rec"><i /> REC</span><span>4K / DCI</span></div>
              <div className="hud-bottom"><span ref={timecodeRef}>TC 00:00:00:00</span><span>CG / SHOWREEL</span></div>
            </div>
          </div>
        </div>

        <div className="hero-reference-strip" aria-label={language === "tr" ? "Referans markalar" : "Selected clients"}>
          <div className="hero-reference-track">
            {brandNames.map((brand) => brand.logo ? <img key={brand.id} src={brand.logo} alt={brand.label} loading="eager" decoding="async" /> : <span className="hero-reference-text" key={brand.id}>{brand.label}</span>)}
            {brandNames.map((brand) => brand.logo ? <img className="hero-reference-duplicate" key={`${brand.id}-duplicate`} src={brand.logo} alt="" aria-hidden="true" loading="eager" decoding="async" /> : <span className="hero-reference-text hero-reference-duplicate" key={`${brand.id}-duplicate`} aria-hidden="true">{brand.label}</span>)}
          </div>
        </div>

        <div className="hero-foot">
          <p>{copy.heroFoot}</p>
          <div className="hero-tags">{copy.heroTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a href="#work">{copy.discover}<span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-intro reveal-on-scroll">
          <p className="eyebrow">{copy.workEyebrow}</p>
          <h2>{copy.workTitle}</h2>
          <p>{copy.workText}</p>
        </div>
        <p className="work-subhead reveal-on-scroll">{copy.caseStudies}</p>
        <div className="case-project-grid">
          {projectData.filter((project) => project.featuredCase).map((project, index) => (
            <article className="case-project reveal-on-scroll" style={{ "--stagger": index } as React.CSSProperties} key={project.title}>
              <a className="project-media" href={`https://www.youtube.com/watch?v=${project.youtubeId}`} data-cursor-label={copy.cursor} onClick={(event) => { event.preventDefault(); openVideo(project.youtubeId, project.title); }} aria-label={`${project.title} — ${copy.watch}`}>
                <ProjectPoster slug={project.slug} alt={project.alt[language]} sizes="(max-width: 900px) 100vw, 50vw" />
                <span className="media-corner-label" aria-hidden="true">{copy.watch}</span>
              </a>
              <div className="project-meta">
                <div><p>{project.type[language]}</p><h3>{project.title}</h3></div>
                <span>{project.year}</span>
              </div>
              {project.caseStudy && (
                <div className="case-study" aria-label={`${project.title} — ${copy.caseStudyLabel}`}>
                  <p>{copy.caseStudyLabel}</p>
                  <dl>
                    {project.caseStudy[language].map(([label, text]) => (
                      <div key={label}><dt>{label}</dt><dd>{text}</dd></div>
                    ))}
                  </dl>
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="work-subhead archive-subhead reveal-on-scroll">{copy.archive}</p>
        <div className="project-grid">
          {projectData.filter((project) => !project.featuredCase).map((project, index) => (
            <article className="project-card reveal-on-scroll" style={{ "--stagger": index } as React.CSSProperties} key={project.title}>
              <a href={`https://www.youtube.com/watch?v=${project.youtubeId}`} data-cursor-label={copy.cursor} onClick={(event) => { event.preventDefault(); openVideo(project.youtubeId, project.title); }} aria-label={`${project.title} — ${copy.watch}`}>
                <div className="project-image">
                  <ProjectPoster slug={project.slug} alt={project.alt[language]} sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                </div>
                <div className="project-meta">
                  <div><p>{project.type[language]}</p><h3>{project.title}</h3></div>
                  <span>{project.year}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="channel-section" aria-labelledby="channel-title">
        <div className="channel-head reveal-on-scroll">
          <p className="eyebrow">{copy.channelEyebrow}</p>
          <h2 id="channel-title">{copy.channelTitle}</h2>
          <p>{copy.channelText}</p>
        </div>
        <div className="channel-grid">
          <a
            className="instagram-spotlight reveal-on-scroll"
            href="https://www.instagram.com/cinegurustudio/"
            target="_blank"
            rel="noreferrer"
            aria-label={copy.instagramAria}
          >
            <div className="instagram-spotlight-media">
              <picture>
                <source srcSet="/assets/instagram-studio-feed-v1.avif" type="image/avif" />
                <img
                  src="/assets/instagram-studio-feed-v1.webp"
                  width="550"
                  height="909"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 900px) 86vw, 34vw"
                  alt={copy.instagramAlt}
                />
              </picture>
            </div>
            <div className="instagram-spotlight-meta"><div><p>{copy.instagramOverline}</p><h3>{copy.instagramTitle}</h3></div><span>{copy.instagramLink} ↗</span></div>
          </a>

          <article className="reels-showcase reveal-on-scroll">
            <div className="channel-card-head"><span>{copy.youtubeOverline}</span><a href="https://www.youtube.com/@CineguruStudio" target="_blank" rel="noreferrer">{copy.youtubeChannel} ↗</a></div>
            <div className="shorts-grid">
              {reelsData.map((reel) => (
                <a key={reel.youtubeId} href={`https://www.youtube.com/shorts/${reel.youtubeId}`} className="short-film" data-cursor-label={copy.cursor} onClick={(event) => { event.preventDefault(); openVideo(reel.youtubeId, reel.title[language], "vertical"); }} aria-label={`${reel.title[language]} — ${copy.watchReel}`}>
                  <span className="short-film-media">
                    <ReelPoster slug={reel.slug} alt={reel.alt[language]} sizes="(max-width: 640px) 72vw, (max-width: 940px) 44vw, 28vw" />
                  </span>
                  <span className="short-film-meta"><small>{reel.type[language]} · {reel.year}</small><strong>{reel.title[language]}</strong><i>{copy.watchReel} ↗</i></span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-intro compact reveal-on-scroll">
          <p className="eyebrow">{copy.servicesEyebrow}</p>
          <h2>{copy.servicesTitle}</h2>
        </div>
        <div className="service-list" ref={serviceRef}>
          <div className="service-spine" aria-hidden="true"><i /></div>
          {services.map((service, index) => (
            <article className="service-row reveal-on-scroll" style={{ "--stagger": index } as React.CSSProperties} key={service.no}>
              <span className="service-no">{service.no}</span>
              <h3>{service.title[language]}</h3>
              <p>{service.text[language]}</p>
              <div className="service-tags">{service.tags[language].map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="hybrid-section production-system" id="method">
        <div className="hybrid-copy reveal-on-scroll">
          <p className="eyebrow">{copy.hybridEyebrow}</p>
          <h2>{copy.hybridTitle}</h2>
          <p>{copy.hybridText}</p>
        </div>
        <div className="method-space reveal-on-scroll">
          <div className="method-space-head"><span>{copy.methodSystem}</span><span><i /> {copy.methodLive}</span></div>
          <div
            className="method-scene"
            id="method-panel"
            role="tabpanel"
            aria-labelledby={`method-tab-${methodPhase}`}
          >
            <div className="method-halo halo-a" />
            <div className="method-halo halo-b" />
            <div className="method-halo halo-c" />
            <div className="method-plane plane-a" />
            <div className="method-plane plane-b" />
            <div className="method-core">
              <img key={activeMethodPhase.image + methodPhase} src={activeMethodPhase.image} width="1600" height="960" loading="lazy" decoding="async" alt={activeMethodPhase.alt[language]} />
              <div className="method-core-shade" />
              <div className={`method-semantic semantic-${activeMethodPhase.mode}`} aria-hidden="true">
                <span>{activeMethodPhase.name[language]}</span>
                <div className="semantic-visual"><i /><i /><i /><i /></div>
                <strong>{activeMethodPhase.semantic[language]}</strong>
              </div>
              <span>{activeMethodPhase.code}</span>
            </div>
            <div className="method-node node-human"><span>01</span>{methodPhases[0].name[language].toUpperCase()}</div>
            <div className="method-node node-ai"><span>02</span>{methodPhases[1].name[language].toUpperCase()}</div>
            <div className="method-node node-film"><span>03</span>{methodPhases[2].name[language].toUpperCase()}</div>
          </div>
          <div className="method-readout">
            <div><span>{activeMethodPhase.tag[language]}</span><strong>{activeMethodPhase.name[language]}</strong></div>
            <p>{activeMethodPhase.detail[language]}</p>
          </div>
          <div className="method-selector" role="tablist" aria-label={copy.methodTabs}>
            {methodPhases.map((phase, index) => (
              <button
                key={phase.code}
                id={`method-tab-${index}`}
                className={index === methodPhase ? "active" : ""}
                onClick={() => selectMethodPhase(index)}
                onKeyDown={(event) => handleMethodKeys(event, index)}
                role="tab"
                aria-selected={index === methodPhase}
                aria-controls="method-panel"
                tabIndex={index === methodPhase ? 0 : -1}
              ><span>{phase.code}</span>{phase.name[language]}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-head reveal-on-scroll">
          <p className="eyebrow">{copy.processEyebrow}</p>
          <h2>{copy.processTitle}</h2>
        </div>
        <ol className="process-grid">
          {copy.steps.map(([title, text], index) => (
            <li className="process-step reveal-on-scroll" style={{ "--stagger": index } as React.CSSProperties} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" id="about">
        <div className="about-top reveal-on-scroll">
          <p className="eyebrow">{copy.aboutEyebrow}</p>
          <h2>{copy.aboutTitle}</h2>
          <p>{copy.aboutText}</p>
        </div>
        <div className="principles-grid">
          {copy.principles.map(([code, title, text], index) => (
            <article className="principle reveal-on-scroll" style={{ "--stagger": index } as React.CSSProperties} key={code}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="brand-wall reveal-on-scroll">
          <p>{copy.brands}</p>
          <div className="client-grid">
            {brandNames.map((brand) => (
              <div className={`client-cell brand-${brand.id}`} key={brand.id}>
                {brand.logo ? <img src={brand.logo} alt={`${brand.label} ${language === "tr" ? "logosu" : "logo"}`} loading="lazy" decoding="async" /> : <span>{brand.label}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div className="contact-copy reveal-on-scroll">
            <p className="eyebrow">{copy.contactEyebrow}</p>
            <h2>{copy.contactTitle}</h2>
            <p className="contact-description">{copy.contactText}</p>
            <div className="contact-actions">
              <a className="button button-dark" href={`mailto:info@wearecineguru.com?subject=${encodeURIComponent(copy.formSubject)}`} data-magnetic>{copy.mail}<span>↗</span></a>
              <a className="text-link light" href="tel:+905318446206">{copy.phone}<span>+90 531 844 62 06</span></a>
            </div>
          </div>
          <form className="contact-form reveal-on-scroll" onSubmit={submitContact} noValidate>
            <div className={`form-field ${formErrors.name ? "has-error" : ""}`}>
              <label htmlFor="contact-name">{copy.formName}</label>
              <input id="contact-name" name="name" autoComplete="name" value={formValues.name} onChange={(event) => setFormValues({ ...formValues, name: event.target.value })} aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? "name-error" : undefined} />
              {formErrors.name && <small id="name-error">{formErrors.name}</small>}
            </div>
            <div className={`form-field ${formErrors.email ? "has-error" : ""}`}>
              <label htmlFor="contact-email">{copy.formEmail}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" value={formValues.email} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? "email-error" : undefined} />
              {formErrors.email && <small id="email-error">{formErrors.email}</small>}
            </div>
            <div className={`form-field ${formErrors.brief ? "has-error" : ""}`}>
              <label htmlFor="contact-brief">{copy.formBrief}</label>
              <textarea id="contact-brief" name="brief" rows={4} value={formValues.brief} onChange={(event) => setFormValues({ ...formValues, brief: event.target.value })} aria-invalid={Boolean(formErrors.brief)} aria-describedby={formErrors.brief ? "brief-error" : undefined} />
              {formErrors.brief && <small id="brief-error">{formErrors.brief}</small>}
            </div>
            <div className="form-submit-row">
              <button type="submit" className="form-submit" data-magnetic>{copy.formSend} <span>↗</span></button>
              <a href="mailto:info@wearecineguru.com">{copy.formDirect}</a>
            </div>
            <p className="form-status" aria-live="polite">{formStatus}</p>
          </form>
        </div>
        <div className="contact-info-grid">
          <a href="mailto:info@wearecineguru.com"><span>{copy.emailLabel}</span><strong>info@wearecineguru.com</strong></a>
          <address><span>{copy.location}</span><strong>{copy.address}</strong></address>
          <div><span>{copy.socialLabel}</span><strong><a href="https://www.instagram.com/cinegurustudio/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/company/thecineguru" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.youtube.com/@CineguruStudio" target="_blank" rel="noreferrer">YouTube ↗</a></strong></div>
        </div>
      </section>

      <footer>
        <a className="brand-link footer-brand-link" href="#top" aria-label={copy.homeLabel}><span className="brand-logo" aria-hidden="true" /></a>
        <p>{copy.footerLine}<br />info@wearecineguru.com<br />{copy.address}</p>
        <div className="social-links">
          <a href="https://www.instagram.com/cinegurustudio/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://www.linkedin.com/company/thecineguru" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.youtube.com/@CineguruStudio" target="_blank" rel="noreferrer">YouTube ↗</a>
        </div>
        <p className="copyright">© 2017—{new Date().getFullYear()} Cineguru Studio</p>
      </footer>
      </main>

      {video && (
        <div ref={modalRef} className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onClick={() => setVideo(null)}>
          <div className={`video-modal-inner ${video.orientation === "vertical" ? "is-vertical" : ""}`} onClick={(event) => event.stopPropagation()}>
            <div className="video-modal-head"><p id="video-modal-title">{video.title}</p><button ref={modalCloseRef} onClick={() => setVideo(null)}>{copy.close} <span>×</span></button></div>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
