// app/sitemap.xml/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://caraudioexpert.com.au/'; // Replace with your actual domain

  // Example URLs (replace with your dynamic pages)
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    "term-condtion",
    "privacy-policy",
    "/secure-shopping",
    "/shipping-and-return"
  ];

  const urls = staticRoutes.map(route => {
    return `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
