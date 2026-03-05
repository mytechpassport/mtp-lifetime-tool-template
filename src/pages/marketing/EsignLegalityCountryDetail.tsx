import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getCountryData } from "@/utils/esignLegalityContent";
import { PageSeo } from "@/components/seo/PageSeo";

export default function EsignLegalityDetail() {
  const { country } = useParams(); // Matches /e-signature-legality/:country
  const data = getCountryData(country || "");

  if (!data) {
    return <div>Country not found</div>;
  }

  // Format country name for display (e.g. "united-states" → "United States")
  const countryDisplayName =
    data.frontmatter.title ||
    (country || "")
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PageSeo
        title={`E-Signature Legality in ${countryDisplayName}`}
        description={`Learn about e-signature legality and compliance requirements in ${countryDisplayName}. MyTechPassport provides legally binding digital signatures compliant with local law.`}
        canonical={`/e-signature-legality/${country}`}
        keywords={`e-signature ${countryDisplayName}, electronic signature legality ${countryDisplayName}, digital signature law ${countryDisplayName}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `E-Signature Legality in ${countryDisplayName}`,
          description: `E-signature legality guide for ${countryDisplayName} — MyTechPassport`,
          url: `https://mytechpassport.com/e-signature-legality/${country}`,
          publisher: {
            "@type": "Organization",
            name: "MyTechPassport",
          },
        }}
      />

      <h1 className="text-3xl font-bold mb-2">{data.frontmatter.title}</h1>
      <p className="text-gray-600 mb-8">{data.frontmatter.subtitle}</p>

      <article className="prose lg:prose-xl">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </article>
    </div>
  );
}
