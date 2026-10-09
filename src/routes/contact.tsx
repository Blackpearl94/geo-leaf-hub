import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/lib/products";
import { pending, site } from "@/lib/site";
import { PageHero } from "@/components/site/Sections";

type Search = { product?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({ product: typeof s["product"] === "string" ? s["product"] : undefined }),
  head: () => ({
    meta: [
      { title: "Contact GeoLeaf | Product Inquiries" },
      { name: "description", content: "Contact GeoLeaf for product inquiries, dealership and distribution opportunities, and general questions." },
      { property: "og:title", content: "Contact GeoLeaf | Product Inquiries" },
      { property: "og:description", content: "Get in touch with the GeoLeaf team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const inquiryTypes = ["General Inquiry", "Product Inquiry", "Dealership/Distribution", "Other"];
const productOptions = [...products.map((p) => p.name), "Not Sure"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<Record<"full_name" | "email" | "message", string>>;

const fieldCls = "w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-ring/30";

function Contact() {
  const { product } = Route.useSearch();
  const initialProduct = products.find((p) => p.slug === product)?.name ?? "Not Sure";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const data = {
      full_name: get("full_name"),
      email: get("email"),
      phone: get("phone") || null,
      company: get("company") || null,
      inquiry_type: get("inquiry_type"),
      product: get("product"),
      message: get("message"),
    };
    const errs: Errors = {};
    if (!data.full_name) errs.full_name = "Please enter your full name.";
    else if (data.full_name.length > 120) errs.full_name = "Name must be under 120 characters.";
    if (!data.email) errs.email = "Please enter your email address.";
    else if (!emailRe.test(data.email) || data.email.length > 255) errs.email = "Please enter a valid email address.";
    if (!data.message) errs.message = "Please enter a message.";
    else if (data.message.length > 3000) errs.message = "Message must be under 3000 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("loading");
    const { error } = await supabase.from("inquiries").insert(data);
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    e.currentTarget?.reset?.();
  }

  const info = [
    { icon: Mail, label: "Email", value: site.email },
    { icon: Phone, label: "Phone", value: site.phone },
    { icon: MapPin, label: "Address", value: site.address },
    { icon: Clock, label: "Business Hours", value: site.hours },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch with GeoLeaf" text="Connect with us for product inquiries, agricultural business opportunities, dealership discussions, and other questions." />
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border bg-card p-6 shadow-soft sm:p-10">
          {status === "success" ? (
            <div className="py-16 text-center fade-up" role="status">
              <CheckCircle2 className="mx-auto h-14 w-14 text-leaf" />
              <h2 className="mt-5 text-3xl font-semibold text-primary">Thank you!</h2>
              <p className="mt-3 text-muted-foreground">Your inquiry has been received. The GeoLeaf team will get back to you.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-8 rounded-full border-2 border-primary px-6 py-2.5 font-bold text-primary hover:bg-primary hover:text-primary-foreground">
                Send another inquiry
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <h2 className="text-2xl font-semibold text-primary sm:col-span-2">Send us an inquiry</h2>
              <Field label="Full Name" name="full_name" required error={errors.full_name}>
                <input id="full_name" name="full_name" autoComplete="name" maxLength={120} className={fieldCls} aria-invalid={!!errors.full_name} />
              </Field>
              <Field label="Email Address" name="email" required error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={255} className={fieldCls} aria-invalid={!!errors.email} />
              </Field>
              <Field label="Phone Number" name="phone">
                <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldCls} />
              </Field>
              <Field label="Company or Organization" name="company">
                <input id="company" name="company" autoComplete="organization" maxLength={160} className={fieldCls} />
              </Field>
              <Field label="Inquiry Type" name="inquiry_type">
                <select id="inquiry_type" name="inquiry_type" defaultValue={product ? "Product Inquiry" : "General Inquiry"} className={fieldCls}>
                  {inquiryTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Product of Interest" name="product">
                <select id="product" name="product" defaultValue={initialProduct} className={fieldCls}>
                  {productOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message" name="message" required error={errors.message}>
                  <textarea id="message" name="message" rows={5} maxLength={3000} className={fieldCls} aria-invalid={!!errors.message} />
                </Field>
              </div>
              {status === "error" && (
                <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2">
                  Sorry, your inquiry couldn't be sent. Please try again in a moment.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-colors hover:bg-leaf disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "loading" ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-2xl border bg-card p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-1 font-semibold">{value ?? pending}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}

function Field({ label, name, required, error, children }: { label: string; name: string; required?: boolean; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label} {required ? <span className="text-destructive">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
