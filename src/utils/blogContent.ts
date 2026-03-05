import matter from "gray-matter";

// Load all blog post index.md files from src/content/blog/ eagerly
const modules = import.meta.glob("../content/blog/*/index.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface BlogPostData extends BlogPostMeta {
  content: string;
}

export const getBlogPost = (slug: string): BlogPostData | null => {
  const foundPath = Object.keys(modules).find((p) =>
    p.toLowerCase().includes(`/${slug.toLowerCase()}/`),
  );

  if (!foundPath) return null;

  const rawContent = modules[foundPath] as string;
  const { data, content } = matter(rawContent);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    author: data.author || "My Tech Passport Team",
    excerpt: data.excerpt || "",
    category: data.category || "General",
    readTime: data.readTime || "5 min read",
    content,
  };
};

export const getAllBlogPosts = (): BlogPostMeta[] => {
  return (
    Object.keys(modules)
      .map((path) => {
        const parts = path.split("/");
        const slug = parts[parts.length - 2] || "";
        const { data } = matter(modules[path] as string);
        return {
          slug,
          title: data.title || slug,
          date: data.date || "",
          author: data.author || "My Tech Passport Team",
          excerpt: data.excerpt || "",
          category: data.category || "General",
          readTime: data.readTime || "5 min read",
        };
      })
      // Sort by date descending (newest first)
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
  );
};
