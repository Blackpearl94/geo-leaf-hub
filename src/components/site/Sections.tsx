import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import banner from "@/assets/banner-landscape.jpg";

export function PageHero({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary pb-20 pt-36 text-primary-foreground">
      <img src={banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" width={1920} height={912} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative fade-up">
        {children}
        {eyebrow && <p className="eyebrow !text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg opacity-85">{text}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function ContactCta({ title = "Let's Connect", text = "Have questions about our products or interested in working with GeoLeaf? Get in touch with our team.", cta = "Contact Us" }: { title?: string; text?: string; cta?: string }) {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-14 text-center sm:px-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-leaf/20" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/25" />
        <div className="relative">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{text}</p>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground transition-colors hover:bg-leaf">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
