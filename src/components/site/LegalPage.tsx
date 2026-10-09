import { PageHero } from "./Sections";

export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <>
      <PageHero title={title} />
      <section className="container-x max-w-3xl py-16">
        <p className="mb-10 rounded-2xl border border-dashed bg-muted p-5 text-sm text-muted-foreground">
          This page is a draft placeholder and is not final legal text. It will be updated by GeoLeaf.
        </p>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-semibold text-primary">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
