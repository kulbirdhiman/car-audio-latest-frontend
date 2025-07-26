import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL ="https://api.caraudioexpert.com.au";
const BASE_SITE_URL = "https://caraudioexpert.com.au";
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchProductSlugs(): Promise<string[]> {
  try {
    const response = await axios.get(`${BASE_URL}/v1/product/product-slug`);
    if (response.data?.success && Array.isArray(response.data.slugs)) {
      return response.data.slugs;
    }
    return [];
  } catch (error) {
    console.error("Error fetching product slugs:", error);  
    return [];
  }
}

export async function GET() {
  const slugs = await fetchProductSlugs();

  const dynamicUrls = slugs
    .map((slug) => {
      const url = `${BASE_SITE_URL}/product/${slug}`;
      return `
        <url>
          <loc>${escapeXml(url)}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_SITE_URL}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${dynamicUrls}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
