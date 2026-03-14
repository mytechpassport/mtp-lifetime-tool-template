import { Helmet } from "react-helmet-async";

const SITE_NAME = "MyTechPassport";
// TODO: Update SITE_URL to this tool's production subdomain before deploying.
// Subdomain is defined by the `subdomain_url` field in apps/backend_simple/scripts/mtp/seed_mtp_tools.js
// Format: https://<subdomain_url>.mytechpassport.com
const SITE_URL = "https://mytechpassport.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageSeoProps {
  /** Page-specific title (will be suffixed with " | MyTechPassport") */
  title: string;
  /** Page-specific meta description (150-160 chars ideal) */
  description: string;
  /** Canonical path, e.g. "/blog/save-10-hours" (no trailing slash needed) */
  canonical?: string;
  /** OG image URL - defaults to site-wide og-image.png */
  ogImage?: string;
  /** article for blog posts, website for everything else */
  ogType?: "website" | "article";
  /** Article-specific metadata (only used when ogType="article") */
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
  /** Additional keywords for the page */
  keywords?: string;
  /** JSON-LD structured data object (will be serialized) */
  structuredData?: Record<string, unknown>;
}

/**
 * PageSeo - drop this at the top of any public page component.
 * Works both in the browser (client routing) and during SSG
 * prerender via react-helmet-async's HelmetProvider context.
 */
export function PageSeo({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  article,
  keywords,
  structuredData,
}: PageSeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mytechpassport" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific (blog posts) */}
      {ogType === "article" && article?.publishedTime && (
        <meta
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {ogType === "article" && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {ogType === "article" &&
        article?.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* JSON-LD structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
