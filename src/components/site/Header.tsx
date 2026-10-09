import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const linkCls = (active: boolean) =>
    cn(
      "relative py-2 text-sm font-semibold transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-all",
      active ? "after:w-full" : "after:w-0 hover:after:w-full",
      solid ? "text-foreground hover:text-primary" : "text-primary-foreground",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b bg-surface/95 shadow-soft backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Logo light={!solid} />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <Link to="/" className={linkCls(pathname === "/")}>Home</Link>
          <div className="relative" ref={dropRef} onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
            <div className="flex items-center gap-1">
              <Link to="/products" className={linkCls(pathname.startsWith("/products"))}>Products</Link>
              <button
                type="button"
                aria-label="Show products"
                aria-expanded={dropOpen}
                onClick={() => setDropOpen((v) => !v)}
                className={cn("rounded p-1", solid ? "text-foreground" : "text-primary-foreground")}
              >
                <ChevronDown className={cn("h-4 w-4 transition-transform", dropOpen && "rotate-180")} />
              </button>
            </div>
            {dropOpen && (
              <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3">
                <div className="fade-up rounded-2xl border bg-popover p-2 shadow-lift" style={{ animationDuration: "0.25s" }}>
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/about" className={linkCls(pathname === "/about")}>About Us</Link>
          <Link to="/contact" className={linkCls(pathname === "/contact")}>Contact Us</Link>
          <Link
            to="/products"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore Products
          </Link>
        </nav>

        <button
          type="button"
          className={cn("rounded-lg p-2 lg:hidden", solid ? "text-foreground" : "text-primary-foreground")}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t bg-surface lg:hidden">
          <div className="container-x flex flex-col py-4">
            <Link to="/" className="rounded-lg px-2 py-3 font-semibold">Home</Link>
            <div className="flex items-center justify-between">
              <Link to="/products" className="flex-1 rounded-lg px-2 py-3 font-semibold">Products</Link>
              <button
                type="button"
                aria-label="Toggle products list"
                aria-expanded={mobileProducts}
                onClick={() => setMobileProducts((v) => !v)}
                className="p-3"
              >
                <ChevronDown className={cn("h-5 w-5 transition-transform", mobileProducts && "rotate-180")} />
              </button>
            </div>
            {mobileProducts && (
              <div className="mb-2 ml-3 border-l-2 border-leaf pl-3">
                {products.map((p) => (
                  <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="block py-2.5 text-muted-foreground">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/about" className="rounded-lg px-2 py-3 font-semibold">About Us</Link>
            <Link to="/contact" className="rounded-lg px-2 py-3 font-semibold">Contact Us</Link>
            <Link to="/products" className="mt-3 rounded-full bg-accent px-5 py-3 text-center font-bold text-accent-foreground">
              Explore Products
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
