export type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  accent: string;
};

export type FeaturedCollection = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "mens-street",
    tag: "Men's Edit",
    title: "Streetwear That Moves With You",
    subtitle: "Bold layers, clean silhouettes, and premium fabrics built for everyday confidence.",
    cta: "Shop Men's Fashion",
    href: "/shop?category=fashion",
    image: "/images/hero/slide-1.jpg",
    accent: "from-amber-500/25 via-transparent to-transparent",
  },
  {
    id: "womens-style",
    tag: "Women's Edit",
    title: "Statement Looks For Every Season",
    subtitle: "From casual chic to evening glam — curated outfits that turn heads.",
    cta: "Shop Women's Fashion",
    href: "/shop?category=fashion",
    image: "/images/hero/slide-2.jpg",
    accent: "from-rose-500/25 via-transparent to-transparent",
  },
  {
    id: "urban-duo",
    tag: "New Drop",
    title: "Urban Essentials Collection",
    subtitle: "Matching sets, sneakers, and accessories — styled for the modern marketplace.",
    cta: "Explore Collection",
    href: "/shop?category=fashion",
    image: "/images/hero/slide-3.jpg",
    accent: "from-sky-500/25 via-transparent to-transparent",
  },
  {
    id: "luxury-women",
    tag: "Limited Offer",
    title: "Luxury Looks. Smart Prices.",
    subtitle: "Up to 40% off trending fashion — limited time only.",
    cta: "Shop Flash Deals",
    href: "/shop?category=fashion",
    image: "/images/hero/slide-4.jpg",
    accent: "from-violet-500/25 via-transparent to-transparent",
  },
];

export const featuredCollections: FeaturedCollection[] = [
  {
    id: "mens",
    title: "Men's Wardrobe",
    description: "Tailored fits, street layers, and weekend essentials.",
    image: "/images/hero/slide-1.jpg",
    href: "/shop?category=fashion",
  },
  {
    id: "womens",
    title: "Women's Boutique",
    description: "Dresses, denim, and accessories curated weekly.",
    image: "/images/hero/slide-2.jpg",
    href: "/shop?category=fashion",
  },
  {
    id: "footwear",
    title: "Sneakers & Footwear",
    description: "Iconic pairs from street to sport.",
    image: "/images/products/4.jpg",
    href: "/shop?category=fashion",
  },
];

export const trustStats = [
  { label: "Happy Customers", value: "50K+" },
  { label: "Fashion Brands", value: "120+" },
  { label: "Same-Day Dispatch", value: "24h" },
  { label: "Secure Checkout", value: "100%" },
];
