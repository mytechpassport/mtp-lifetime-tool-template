/**
 * scripts/prerender.ts
 *
 * Generates static HTML for all public pages and writes sitemap.xml.
 *
 * FLOW:
 *   1. vite build          → dist/ (SPA client build)
 *   2. vite build --ssr    → .prerender-cache/ (server bundle)
 *   3. tsx scripts/prerender.ts  → injects pre-rendered HTML into dist/
 *   4. Generates public/sitemap.xml
 *   5. Cleans up .prerender-cache/
 *
 * Run via: npm run build
 *
 * NOTE: This script uses tsx/ESM. It dynamically imports the SSR bundle
 * built in step 2 to render each route without a live server.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_CACHE = path.join(ROOT, ".prerender-cache");
const SRC_CONTENT = path.join(ROOT, "src", "content");
// TODO: Update BASE_URL to this tool's production subdomain before deploying.
// Subdomain is defined by the `subdomain_url` field in apps/backend_simple/scripts/mtp/seed_mtp_tools.js
// Format: https://<subdomain_url>.mytechpassport.com
// Example: https://ai-detection.mytechpassport.com
const BASE_URL = "https://mytechpassport.com";

// ---------------------------------------------------------------------------
// Route enumeration
// ---------------------------------------------------------------------------

/** Read folder children and return their names (directory slugs) */
function readDirSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
}

const blogSlugs = readDirSlugs(path.join(SRC_CONTENT, "blog"));
const countrySlugs = readDirSlugs(path.join(SRC_CONTENT, "esignLegality"));

/** All public routes to pre-render (static + dynamic) */
const STATIC_ROUTES = [
  "/",
  "/blog",
  "/about",
  "/become-a-vendor",
  "/changelog",
  "/electronic-signature",
  "/electronic-signature/legality-statement",
  "/electronic-signature/terms",
  "/e-signature-legality",
  "/privacy-policy",
  "/terms-of-service",
  "/acceptable-use-policy",
  "/data-processing-agreement",
  "/service-specific-terms",
];

const DYNAMIC_ROUTES = [
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...countrySlugs.map((s) => `/e-signature-legality/${s}`),
];

const ALL_ROUTES = [...STATIC_ROUTES, ...DYNAMIC_ROUTES];

// ---------------------------------------------------------------------------
// HTML injection helpers
// ---------------------------------------------------------------------------

function injectHelmet(
  template: string,
  appHtml: string,
  helmet: Record<string, { toString(): string }>,
): string {
  let result = template;

  // Replace <div id="root"></div> with pre-rendered content
  result = result.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  // Inject Helmet tags into <head>
  // We build the helmet string from each helmet property
  const helmetTitle = helmet?.title?.toString() ?? "";
  const helmetMeta = helmet?.meta?.toString() ?? "";
  const helmetLink = helmet?.link?.toString() ?? "";
  const helmetScript = helmet?.script?.toString() ?? "";

  // Replace the existing <title> with the helmet-injected one (if present)
  if (helmetTitle) {
    result = result.replace(/<title>[^<]*<\/title>/, helmetTitle);
  }

  // Insert meta/link/script tags before </head>
  const headInject = [helmetMeta, helmetLink, helmetScript]
    .filter(Boolean)
    .join("\n  ");

  if (headInject) {
    result = result.replace("</head>", `  ${headInject}\n</head>`);
  }

  return result;
}

/** Convert a URL path to a file path within dist/ */
function routeToFilePath(route: string): string {
  const normalized = route === "/" ? "/index.html" : `${route}/index.html`;
  return path.join(DIST, normalized);
}

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

function generateSitemap(): void {
  const now = new Date().toISOString().split("T")[0];

  const entries: SitemapEntry[] = [
    { path: "/", priority: "1.0", changefreq: "weekly", lastmod: now },
    { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod: now },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/become-a-vendor", priority: "0.8", changefreq: "monthly" },
    { path: "/electronic-signature", priority: "0.8", changefreq: "monthly" },
    {
      path: "/e-signature-legality",
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      path: "/electronic-signature/legality-statement",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/electronic-signature/terms",
      priority: "0.6",
      changefreq: "monthly",
    },
    { path: "/changelog", priority: "0.6", changefreq: "weekly" },
    { path: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
    { path: "/terms-of-service", priority: "0.4", changefreq: "yearly" },
    {
      path: "/acceptable-use-policy",
      priority: "0.4",
      changefreq: "yearly",
    },
    {
      path: "/data-processing-agreement",
      priority: "0.4",
      changefreq: "yearly",
    },
    {
      path: "/service-specific-terms",
      priority: "0.4",
      changefreq: "yearly",
    },
    // Blog posts
    ...blogSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      priority: "0.8",
      changefreq: "monthly",
    })),
    // Country e-sign pages
    ...countrySlugs.map((slug) => ({
      path: `/e-signature-legality/${slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  // Write into dist/ (deployed) AND public/ (so dev server also has it)
  const distSitemapPath = path.join(DIST, "sitemap.xml");
  const publicSitemapPath = path.join(ROOT, "public", "sitemap.xml");

  fs.writeFileSync(distSitemapPath, xml, "utf-8");
  fs.writeFileSync(publicSitemapPath, xml, "utf-8");

  console.log(`  ✅ sitemap.xml → ${entries.length} URLs`);
}

// ---------------------------------------------------------------------------
// Main prerender loop
// ---------------------------------------------------------------------------

async function prerender(): Promise<void> {
  console.log("\n🔄 Prerender starting…");

  // Verify the SSR bundle exists
  const ssrBundlePath = path.join(SSR_CACHE, "entry-server.js");
  if (!fs.existsSync(ssrBundlePath)) {
    throw new Error(
      `SSR bundle not found at ${ssrBundlePath}.\n` +
        'Run "vite build --ssr src/entry-server.tsx --outDir .prerender-cache" first.',
    );
  }

  // Verify the client build exists
  const templatePath = path.join(DIST, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Client build not found at ${templatePath}.\n` +
        'Run "vite build" first.',
    );
  }

  // Import the SSR bundle (must use file:// URL on Windows)
  const { render } = (await import(pathToFileURL(ssrBundlePath).href)) as {
    render: (url: string) => {
      html: string;
      helmet: Record<string, { toString(): string }>;
    };
  };

  const template = fs.readFileSync(templatePath, "utf-8");

  let success = 0;
  let failed = 0;

  for (const route of ALL_ROUTES) {
    try {
      const { html: appHtml, helmet } = render(route);
      const finalHtml = injectHelmet(template, appHtml, helmet);

      const filePath = routeToFilePath(route);
      const dirPath = path.dirname(filePath);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, finalHtml, "utf-8");
      console.log(`  ✅ ${route}`);
      success++;
    } catch (err) {
      console.error(`  ❌ ${route} - ${(err as Error).message}`);
      failed++;
    }
  }

  // Generate sitemap
  generateSitemap();

  // Cleanup SSR cache
  fs.rmSync(SSR_CACHE, { recursive: true, force: true });

  console.log(`\n✨ Prerender complete: ${success} pages, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error("Prerender script failed:", err);
  process.exit(1);
});
