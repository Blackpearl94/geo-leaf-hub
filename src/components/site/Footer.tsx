import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { products } from "@/lib/products";
import { pending, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed opacity-80">
            GeoLeaf brings agricultural products closer to the farming community with a focus on quality,
            innovation and responsible practices.
          </p>
          {site.social.length > 0 && (
            <div className="flex gap-3">
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="text-sm underline">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Quick Links</h3>
          <ul className="space-y-2.5 text-sm opacity-90">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/products" className="hover:text-accent">Products</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Our Products</h3>
          <ul className="space-y-2.5 text-sm opacity-90">
            {products.map((p) => (
              <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-accent">{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Contact</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 text-leaf" /> {site.email ?? `Email: ${pending}`}</li>
            <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 text-leaf" /> {site.phone ?? `Phone: ${pending}`}</li>
            <li className="flex gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-leaf" /> {site.address ?? `Address: ${pending}`}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col gap-3 py-6 text-xs opacity-75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GeoLeaf. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
