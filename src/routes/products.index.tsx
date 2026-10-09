import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ContactCta, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Products | GeoLeaf" },
      { name: "description", content: "Browse the GeoLeaf agricultural product range: Nano Trigger, Kayapalat and more." },
      { property: "og:title", content: "Our Products | GeoLeaf" },
      { property: "og:description", content: "Browse the GeoLeaf agricultural product range." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="The GeoLeaf range" title="Our Products" text="A growing range of agricultural products from GeoLeaf, created with the farming community in mind." />
      <section className="container-x py-20">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">Products will be listed here soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.slug} product={p} cta="View Details" />)}
          </div>
        )}
      </section>
      <ContactCta title="Questions about a product?" text="Our team is happy to help with product inquiries, availability and dealership discussions." />
    </>
  );
}
