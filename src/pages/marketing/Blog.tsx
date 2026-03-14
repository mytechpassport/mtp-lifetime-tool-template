import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAllBlogPosts } from "@/utils/blogContent";
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

const Blog = () => {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground">
      <PageSeo
        title="Blog - Business Automation Guides & Product Updates"
        description="Practical guides, product updates and expert insights to help you automate your small business smarter and save hours every week."
        canonical="/blog"
        keywords="business automation blog, workflow automation guides, small business productivity, automation tips"
      />
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          My Tech Passport Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practical guides, product updates and insights to help you automate
          your business smarter.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block"
          >
            <Card className="h-full p-6 transition-all hover:shadow-lg hover:border-accent border-2">
              <div className="flex flex-col h-full">
                {/* Category + Date */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}
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
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all mt-auto">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

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
    </div>
  );
};

export default Blog;
