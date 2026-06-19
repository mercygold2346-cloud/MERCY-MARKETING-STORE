export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Adaeze O.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Ordered sneakers and a power bank — both arrived exactly as shown. Fast WhatsApp replies and smooth delivery.",
    product: "Fashion & Electronics",
  },
  {
    id: "2",
    name: "James M.",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Best marketing store I've used online. Paystack checkout was easy and I got a confirmation email right away.",
    product: "Home & Gadgets",
  },
  {
    id: "3",
    name: "Fatima K.",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    text: "Love the beauty picks and flash deals. Customer support helped me track my order within hours.",
    product: "Beauty",
  },
  {
    id: "4",
    name: "David T.",
    location: "Ibadan, Nigeria",
    rating: 4,
    text: "Great variety — electronics, fitness gear, fashion all in one place. Will definitely order again.",
    product: "Fitness",
  },
];
