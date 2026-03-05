import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getBlogPost } from "@/utils/blogContent";
import { PageSeo } from "@/components/seo/PageSeo";

const categoryColors: Record<string, string> = {
  Automation: "bg-purple-100 text-purple-700",
  Product: "bg-blue-100 text-blue-700",
  Guides: "bg-green-100 text-green-700",
  Productivity: "bg-orange-100 text-orange-700",
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/blog" replace />;

  const post = getBlogPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const categoryColor =
    categoryColors[post.category] || "bg-gray-100 text-gray-700";

  return (
    <div className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground">
      <PageSeo
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        article={{
          publishedTime: post.date,
          author: post.author,
          tags: [post.category],
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Organization",
            name: post.author,
          },
          datePublished: post.date,
          publisher: {
            "@type": "Organization",
            name: "MyTechPassport",
            logo: {
              "@type": "ImageObject",
              url: "https://mytechpassport.com/img/logo.png",
            },
          },
          url: `https://mytechpassport.com/blog/${post.slug}`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://mytechpassport.com/blog/${post.slug}`,
          },
        }}
      />
      {/* Back Link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Category + Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}
        >
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
        {post.title}
      </h1>

      <p className="text-sm text-muted-foreground mb-8">By {post.author}</p>

      {/* Divider */}
      <hr className="border-border mb-8" />

      {/* Content rendered from Markdown */}
      <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-li:text-foreground/90 prose-p:text-foreground/90 prose-p:leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-base font-bold mt-4 mb-1">{children}</h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-4 mb-1">
                {children}
              </h6>
            ),
            p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-2 last:mb-0">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-2 last:mb-0">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="text-gray-800 bg-muted p-2 rounded text-sm font-mono overflow-x-auto">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-2 last:mb-0">
                <table className="min-w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-muted/50">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="border-b border-border hover:bg-muted/25">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="border border-border px-3 py-2 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border px-3 py-2">{children}</td>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      {/* CTA */}
      <div className="mt-16 p-8 rounded-2xl bg-muted/30 border border-border text-center">
        <h3 className="text-xl font-bold mb-2">
          Ready to start automating your business?
        </h3>
        <p className="text-muted-foreground mb-4">
          Get started free with 1 workflow included. No credit card required.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
