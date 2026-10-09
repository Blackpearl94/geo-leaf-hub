import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | GeoLeaf" },
      { name: "description", content: "GeoLeaf website terms and conditions." },
      { property: "og:title", content: "Terms and Conditions | GeoLeaf" },
      { property: "og:description", content: "Terms for using the GeoLeaf website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms and Conditions"
      sections={[
        { heading: "Use of this website", body: "This website provides general information about GeoLeaf and its products." },
        { heading: "Product information", body: "Product details on this site are subject to change. Please contact GeoLeaf for current information." },
        { heading: "Updates", body: "These terms will be completed and updated by GeoLeaf." },
      ]}
    />
  ),
});
