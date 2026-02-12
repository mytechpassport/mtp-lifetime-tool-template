import matter from "gray-matter";

// 1. Tell Vite to load all .md files in the content/esignLegality directory as raw strings
// Updated to match the folder structure: esignLegality/brazil/index.md, etc.
const modules = import.meta.glob("../content/esignLegality/*/index.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface CountryData {
  slug: string;
  frontmatter: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  content: string;
}

export const getCountryData = (slug: string): CountryData | null => {
  // Normalize slug to match folder structure (e.g., 'brazil' -> '../content/esignLegality/brazil/index.md')
  const path = `../content/esignLegality/${slug}/index.md`;

  // Try case-insensitive matching if needed
  const foundPath = Object.keys(modules).find((p) =>
    p.toLowerCase().includes(`/${slug.toLowerCase()}/`)
  );

  if (!foundPath) return null;

  const rawContent = modules[foundPath] as string;
  const { data, content } = matter(rawContent);

  return {
    slug,
    frontmatter: data,
    content,
  };
};

export const getAllCountries = () => {
  return Object.keys(modules).map((path) => {
    // Extract slug from path (e.g., "../content/esignLegality/brazil/index.md" -> "brazil")
    const parts = path.split("/");
    const slug = parts[parts.length - 2] || ""; // Get the folder name (second to last part)
    const { data } = matter(modules[path] as string);
    return { slug, name: data.title || slug }; // Use frontmatter title if available
  });
};
