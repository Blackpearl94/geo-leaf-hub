import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, ShieldCheck, Sprout, Users } from "lucide-react";
import hero from "@/assets/hero-field.jpg";
import hands from "@/assets/farmer-hands.jpg";
import banner from "@/assets/banner-landscape.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ContactCta, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeoLeaf | Agricultural Products" },
      { name: "description", content: "Discover GeoLeaf's agricultural product range, including Nano Trigger and Kayapalat, designed to support modern farming." },
      { property: "og:title", content: "GeoLeaf | Agricultural Products" },
      { property: "og:description", content: "Growing Better. Growing Greener. Explore the GeoLeaf agricultural product range." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const reasons = [
  { icon: Sprout, title: "Agriculture-Focused Approach", text: "Everything we do starts with the needs of farms and the people who run them." },
  { icon: ShieldCheck, title: "Commitment to Quality", text: "We place care and consistency at the heart of our product range." },
  { icon: Users, title: "Farmer-Centric Thinking", text: "We listen to farmers, dealers and partners to shape how we serve them." },
  { icon: Lightbulb, title: "Focus on Innovation", text: "We look forward, exploring new ideas for modern agriculture." },
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img src={hero} alt="Green crop rows in morning light" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 bottom-10 hidden h-80 w-80 opacity-20 lg:block">
          <path d="M30 170C30 80 80 30 170 30c0 90-50 140-140 140Z" className="fill-leaf" />
          <path d="M40 160C80 110 110 80 150 50" className="stroke-accent" strokeWidth="3" fill="none" />
        </svg>
        <div className="container-x relative pt-24 text-primary-foreground">
          <div className="max-w-2xl fade-up">
            <p className="eyebrow !text-accent">GeoLeaf Agriculture</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Growing Better.<br /><span className="italic text-accent">Growing Greener.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg opacity-90">
              Discover GeoLeaf's agricultural product range, designed to support modern farming and help farmers move toward a more productive future.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
                Explore Our Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground/60 px-7 py-3.5 font-bold transition-colors hover:bg-primary-foreground hover:text-primary">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img src={hands} alt="Farmer's hands holding a healthy seedling in soil" loading="lazy" width={1200} height={1408} className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift" />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-accent px-6 py-5 shadow-lift sm:block">
              <p className="font-display text-xl font-semibold text-accent-foreground">Rooted in the field</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-primary sm:text-5xl">Rooted in Agriculture. Focused on Tomorrow.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              GeoLeaf is committed to bringing agricultural products closer to the farming community through a focus on quality, innovation, and responsible agricultural practices.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We work with farmers, dealers and distributors who share our belief that thoughtful products and honest relationships help agriculture move forward.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground transition-colors hover:bg-leaf">
              Discover GeoLeaf <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our range" title="Explore Our Products" text="Discover the GeoLeaf product range for your agricultural needs." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our approach" title="Why Choose GeoLeaf?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 text-primary-foreground">
        <img src={banner} alt="Aerial view of farmland at sunset" loading="lazy" width={1920} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">Supporting Agriculture. Building a Greener Tomorrow.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg opacity-90">Explore our products and connect with the GeoLeaf team to learn more about our agricultural product range.</p>
          <Link to="/contact" className="mt-9 inline-flex rounded-full bg-accent px-8 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
            Get in Touch
          </Link>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
