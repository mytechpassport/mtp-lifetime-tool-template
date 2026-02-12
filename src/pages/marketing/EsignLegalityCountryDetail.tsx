import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getCountryData } from "@/utils/esignLegalityContent";

export default function EsignLegalityDetail() {
  const { country } = useParams(); // Matches /e-signature-legality/:country
  const data = getCountryData(country || "");

  if (!data) {
    return <div>Country not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{data.frontmatter.title}</h1>
      <p className="text-gray-600 mb-8">{data.frontmatter.subtitle}</p>

      <article className="prose lg:prose-xl">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </article>
    </div>
  );
}
