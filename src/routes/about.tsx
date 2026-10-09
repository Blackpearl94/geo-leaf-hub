import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Handshake, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import hands from "@/assets/farmer-hands.jpg";
import { products } from "@/lib/products";
import { ContactCta, PageHero, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GeoLeaf | Agriculture-Focused Solutions" },
      { name: "description", content: "Learn about GeoLeaf's approach to agriculture, our mission, vision and values." },
      { property: "og:title", content: "About GeoLeaf | Agriculture-Focused Solutions" },
      { property: "og:description", content: "Our approach to agriculture, our values, and our commitment to the farming community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { icon: ShieldCheck, title: "Quality", text: "Care and consistency in what we offer." },
  { icon: Lightbulb, title: "Innovation", text: "Open to new ideas for modern farming." },
  { icon: Handshake, title: "Trust", text: "Honest, long-term relationships." },
  { icon: Users, title: "Farmer-Centric Approach", text: "Farmers' needs guide our decisions." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="About GeoLeaf" text="Discover our approach to agriculture, our values, and our commitment to serving the farming community." />

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary">An agriculture company built around the farm.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            GeoLeaf focuses on agricultural products and on building meaningful relationships with the people who grow our food. We aim to support farmers, dealers, distributors and agricultural partners with a dependable product range and responsive service.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our work is guided by quality, innovation and responsible agricultural practices — and by listening closely to the farming community we serve.
          </p>
        </div>
        <img src={hands} alt="Farmer holding a young plant in fertile soil" loading="lazy" width={1200} height={1408} className="aspect-[5/4] w-full rounded-3xl object-cover shadow-lift" />
      </section>

      <section className="bg-surface py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", text: "To serve the agricultural community with a focus on quality, innovation, and farmer-centric solutions." },
            { icon: Compass, title: "Our Vision", text: "To contribute to a more sustainable and forward-looking agricultural ecosystem." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-primary p-10 text-primary-foreground shadow-lift">
              <Icon className="h-10 w-10 text-accent" strokeWidth={1.5} />
              <h3 className="mt-6 text-3xl font-semibold">{title}</h3>
              <p className="mt-4 text-lg leading-relaxed opacity-90">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <SectionHeading eyebrow="What guides us" title="Our Values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border bg-card p-7 text-center transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-6 w-6" strokeWidth={1.6} /></div>
              <h3 className="mt-5 text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading title="Our Products" />
          <div className="grid gap-5 sm:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group flex items-center gap-4 rounded-2xl border bg-background p-4 transition-all hover:shadow-soft">
                <img src={p.image} alt={p.imageAlt} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
                <span className="font-display text-xl font-semibold text-primary group-hover:text-leaf">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta title="Let's Grow Together" text="Whether you're a farmer, dealer or partner, we'd love to hear from you." cta="Contact GeoLeaf" />
    </>
  );
}
