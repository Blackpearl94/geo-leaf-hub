import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ContactCta } from "@/components/site/Sections";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.product.name ?? "Product";
    const desc = loaderData?.product.shortDescription ?? "GeoLeaf agricultural product.";
    return {
      meta: [
        { title: `${name} | GeoLeaf Agricultural Products` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} | GeoLeaf` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-40 text-center">
      <h1 className="text-4xl font-semibold text-primary">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block font-bold text-leaf underline">Back to all products</Link>
    </div>
  ),
  component: ProductPage,
});

function Pending({ what }: { what: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-dashed bg-muted p-5 text-sm text-muted-foreground">
      <Info className="h-5 w-5 shrink-0 text-leaf" />
      <p>Verified {what} for this product will be published soon. Please contact our team for current information.</p>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="bg-surface pb-20 pt-28">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span aria-current="page" className="font-semibold text-foreground">{product.name}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-muted shadow-lift">
              <img src={product.image} alt={product.imageAlt} width={1024} height={1024} className="aspect-square w-full object-cover" />
            </div>
            <div className="fade-up">
              <p className="eyebrow">{product.tagline}</p>
              <h1 className="mt-3 text-5xl font-semibold text-primary sm:text-6xl">{product.name}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.shortDescription}</p>
              <Link to="/contact" search={{ product: product.slug }} className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
                Enquire About This Product <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-14">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Product Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.overview}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary">Features</h2>
            <div className="mt-5">
              {product.features.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <div key={f.title} className="rounded-2xl border bg-card p-5">
                      <h3 className="text-lg font-semibold text-primary">{f.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  ))}
                </div>
              ) : <Pending what="features" />}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary">Usage Instructions</h2>
            <div className="mt-5">
              {product.usage.length ? (
                <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">{product.usage.map((u) => <li key={u}>{u}</li>)}</ol>
              ) : <Pending what="usage instructions" />}
            </div>
          </div>
        </div>
        <aside>
          <h2 className="text-3xl font-semibold text-primary">Specifications</h2>
          <div className="mt-5">
            {product.specs.length ? (
              <dl className="divide-y overflow-hidden rounded-2xl border bg-card">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-2 gap-4 px-5 py-3 text-sm">
                    <dt className="font-semibold">{s.label}</dt><dd className="text-muted-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : <Pending what="specifications" />}
          </div>
        </aside>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <h2 className="mb-10 text-3xl font-semibold text-primary">Related Products</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <ContactCta title={`Interested in ${product.name}?`} text="Talk to the GeoLeaf team about details, availability and partnership opportunities." />
    </>
  );
}
