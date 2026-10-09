import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | GeoLeaf" },
      { name: "description", content: "GeoLeaf privacy policy." },
      { property: "og:title", content: "Privacy Policy | GeoLeaf" },
      { property: "og:description", content: "How GeoLeaf handles information you share with us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Information we collect", body: "When you submit our contact form, we receive the details you provide, such as your name, email address and message." },
        { heading: "How we use it", body: "We use this information to respond to your inquiry. Further details will be added here." },
        { heading: "Contact", body: "For questions about this policy, please use our Contact page." },
      ]}
    />
  ),
});
