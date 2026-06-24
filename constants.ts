import {
  Atom,
  BrainCircuit,
  Code2,
  Dna,
  Layers,
  Leaf,
  Network,
  Rocket,
} from "lucide-react";
import type { BlogPost } from "@/types/blog";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons/social";

export const PRODUCT_ACCENTS = {
  ai: {
    icon: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/25",
    glow: "from-sky-500/10 via-sky-400/5",
    link: "group-hover:text-sky-400",
    title: "group-hover:text-sky-300",
    index: "group-hover:text-sky-400/55",
    rail: "group-hover:border-l-sky-500/50",
  },
  network: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
    glow: "from-cyan-500/10 via-cyan-400/5",
    link: "group-hover:text-cyan-400",
    title: "group-hover:text-cyan-300",
    index: "group-hover:text-cyan-400/55",
    rail: "group-hover:border-l-cyan-500/50",
  },
  code: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    glow: "from-amber-500/10 via-amber-400/5",
    link: "group-hover:text-amber-400",
    title: "group-hover:text-amber-300",
    index: "group-hover:text-amber-400/55",
    rail: "group-hover:border-l-amber-500/50",
  },
} as const;

export const PRODUCTS = [
  {
    id: 1,
    name: "harcorp.ai",
    description:
      "Advanced AI solutions and products powered by our next-generation AI engine.",
    link: "https://harcorp.ai/",
    icon: BrainCircuit,
    accent: PRODUCT_ACCENTS.ai,
  },
  {
    id: 2,
    name: "harcnet.com",
    description:
      "Our quantum communication platform building a secure, interconnected future through the power of quantum networks.",
    link: "https://harcnet.com/",
    icon: Network,
    accent: PRODUCT_ACCENTS.network,
  },
  {
    id: 3,
    name: "mimic.codes",
    description:
      "A massively parallel, array-based, memory-safe programming language and toolchain for maintaining optimal, reusable software.",
    link: "https://mimic.codes/",
    icon: Code2,
    accent: PRODUCT_ACCENTS.code,
  },
];

export const PLACEHOLDER_BLOGS: BlogPost[] = [
  {
    id: "1",
    slug: "building-artificial-super-intelligence",
    title: "Building Artificial Super Intelligence",
    excerpt:
      "How Harcorp is engineering next-generation AI systems designed to reason, adapt, and scale beyond current limitations.",
    publishedAt: "2026-05-12",
    thumbnailUrl: "/earth-land.png",
    href: "/blog/building-artificial-super-intelligence",
  },
  {
    id: "2",
    slug: "quantum-networks-and-secure-communication",
    title: "Quantum Networks and Secure Communication",
    excerpt:
      "Exploring HarcNet's approach to quantum-secured infrastructure and what it means for the future of global connectivity.",
    publishedAt: "2026-04-28",
    thumbnailUrl: "/earth-spec.jpg",
    href: "/blog/quantum-networks-and-secure-communication",
  },
  {
    id: "3",
    slug: "advanced-materials-for-deep-space",
    title: "Advanced Materials for Deep Space",
    excerpt:
      "Breakthroughs in materials science that enable lighter, stronger, and more resilient structures for aerospace missions.",
    publishedAt: "2026-03-15",
    thumbnailUrl: "/earth-land.png",
    href: "/blog/advanced-materials-for-deep-space",
  },
];

type FocusAccent = {
  icon: string
  bg: string
  border: string
  glow: string
  title: string
  index: string
  rail: string
}

export const FOCUS_AREA_ACCENTS: Record<string, FocusAccent> = {
  ai: {
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/25",
    glow: "from-violet-500/10 via-violet-400/5",
    title: "group-hover:text-violet-300",
    index: "group-hover:text-violet-400/55",
    rail: "group-hover:border-l-violet-500/50",
  },
  quantum: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
    glow: "from-cyan-500/10 via-cyan-400/5",
    title: "group-hover:text-cyan-300",
    index: "group-hover:text-cyan-400/55",
    rail: "group-hover:border-l-cyan-500/50",
  },
  materials: {
    icon: "text-zinc-300",
    bg: "bg-zinc-400/10",
    border: "border-zinc-400/25",
    glow: "from-zinc-400/10 via-zinc-300/5",
    title: "group-hover:text-zinc-200",
    index: "group-hover:text-zinc-400/55",
    rail: "group-hover:border-l-zinc-400/50",
  },
  biotech: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    glow: "from-emerald-500/10 via-emerald-400/5",
    title: "group-hover:text-emerald-300",
    index: "group-hover:text-emerald-400/55",
    rail: "group-hover:border-l-emerald-500/50",
  },
  energy: {
    icon: "text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/25",
    glow: "from-lime-500/10 via-lime-400/5",
    title: "group-hover:text-lime-300",
    index: "group-hover:text-lime-400/55",
    rail: "group-hover:border-l-lime-500/50",
  },
  space: {
    icon: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/25",
    glow: "from-indigo-500/10 via-indigo-400/5",
    title: "group-hover:text-indigo-300",
    index: "group-hover:text-indigo-400/55",
    rail: "group-hover:border-l-indigo-500/50",
  },
};

export const FOCUS_AREAS = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    description:
      "Next-generation models, reasoning systems, and superintelligence research.",
    icon: BrainCircuit,
    accent: FOCUS_AREA_ACCENTS.ai,
  },
  {
    id: "quantum",
    name: "Quantum Computing",
    description:
      "Quantum hardware, algorithms, and secure communication networks.",
    icon: Atom,
    accent: FOCUS_AREA_ACCENTS.quantum,
  },
  {
    id: "materials",
    name: "Advanced Materials",
    description:
      "Novel matter engineering for extreme environments and new capabilities.",
    icon: Layers,
    accent: FOCUS_AREA_ACCENTS.materials,
  },
  {
    id: "biotech",
    name: "Biotechnology",
    description:
      "Synthetic biology and life-science tools for human health and longevity.",
    icon: Dna,
    accent: FOCUS_AREA_ACCENTS.biotech,
  },
  {
    id: "energy",
    name: "Sustainable Energy",
    description:
      "Clean power systems and fusion pathways for planetary-scale demand.",
    icon: Leaf,
    accent: FOCUS_AREA_ACCENTS.energy,
  },
  {
    id: "space",
    name: "Space & Aerospace",
    description:
      "Orbital infrastructure, propulsion, and off-world manufacturing.",
    icon: Rocket,
    accent: FOCUS_AREA_ACCENTS.space,
  },
] as const;

type NewsAccent = {
  badge: string
  border: string
  title: string
  link: string
  rail: string
  glow: string
}

export const NEWS_CATEGORY_ACCENTS: Record<string, NewsAccent> = {
  Partnership: {
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    border: "group-hover:border-violet-500/25",
    title: "group-hover:text-violet-300",
    link: "group-hover:text-violet-400",
    rail: "group-hover:border-l-violet-500/50",
    glow: "from-violet-500/8 via-violet-400/4",
  },
  Product: {
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    border: "group-hover:border-sky-500/25",
    title: "group-hover:text-sky-300",
    link: "group-hover:text-sky-400",
    rail: "group-hover:border-l-sky-500/50",
    glow: "from-sky-500/8 via-sky-400/4",
  },
  Announcement: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    border: "group-hover:border-emerald-500/25",
    title: "group-hover:text-emerald-300",
    link: "group-hover:text-emerald-400",
    rail: "group-hover:border-l-emerald-500/50",
    glow: "from-emerald-500/8 via-emerald-400/4",
  },
};

const DEFAULT_NEWS_ACCENT: NewsAccent = {
  badge: "border-white/20 bg-white/5 text-white/70",
  border: "group-hover:border-white/15",
  title: "group-hover:text-white",
  link: "group-hover:text-white/80",
  rail: "group-hover:border-l-white/30",
  glow: "from-white/5 via-white/2",
};

export function getNewsAccent(category: string): NewsAccent {
  return NEWS_CATEGORY_ACCENTS[category] ?? DEFAULT_NEWS_ACCENT;
}

export const SOCIAL_LINKS = [
  {
    id: "x",
    label: "X / Twitter",
    href: "https://x.com/harcorpindustry",
    icon: XIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/harcorp/",
    icon: LinkedInIcon,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@harcorpindustries",
    icon: YouTubeIcon,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/harcorpindustries",
    icon: GitHubIcon,
  },
] as const;
