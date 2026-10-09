import nanoTrigger from "@/assets/product-nano-trigger.jpg";
import kayapalat from "@/assets/product-kayapalat.jpg";
import third from "@/assets/product-third.jpg";

/**
 * Central product catalogue. Edit names, images and copy here.
 * Leave `features`, `specs` and `usage` empty until verified details are available —
 * the product page then shows a neutral "details coming soon" note instead of invented claims.
 */
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  image: string;
  imageAlt: string;
  features: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  usage: string[];
};

export const products: Product[] = [
  {
    slug: "nano-trigger",
    name: "Nano Trigger",
    tagline: "Part of the GeoLeaf product range",
    shortDescription:
      "An agricultural product from GeoLeaf. Contact our team for verified product details and availability.",
    overview:
      "Detailed product information for Nano Trigger is being prepared. Reach out to the GeoLeaf team to learn more about this product.",
    image: nanoTrigger,
    imageAlt: "Nano Trigger product bottle with fresh green leaves",
    features: [],
    specs: [],
    usage: [],
  },
  {
    slug: "kayapalat",
    name: "Kayapalat",
    tagline: "Part of the GeoLeaf product range",
    shortDescription:
      "An agricultural product from GeoLeaf. Contact our team for verified product details and availability.",
    overview:
      "Detailed product information for Kayapalat is being prepared. Reach out to the GeoLeaf team to learn more about this product.",
    image: kayapalat,
    imageAlt: "Kayapalat product pouch beside soil and a young sprout",
    features: [],
    specs: [],
    usage: [],
  },
  {
    slug: "third-product",
    name: "Third Product",
    tagline: "Coming soon",
    shortDescription:
      "A new addition to the GeoLeaf range. Full product details will be announced soon.",
    overview:
      "Information about this product will be published shortly. Contact our team to register your interest.",
    image: third,
    imageAlt: "GeoLeaf product container with a green leaf",
    features: [],
    specs: [],
    usage: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
