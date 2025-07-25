// app/sitemap.xml/route.ts

import { NextResponse } from 'next/server';

// Example mock DB fetchers (replace with real DB/API calls)
import axios from 'axios';

 async function fetchProductSlugs(): Promise<string[]> {
  try {
    const response = await axios.get('https://caraudioexpert.com.au/v1/product/product-slug');
    
    if (response.data && response.data.success) {
      return response.data.slugs;
    } else {
      console.warn('Unexpected response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch product slugs:', error);
    return [];
  }
}




export async function GET() {
  const baseUrl = 'https://caraudioexpert.com.au';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/term-condtion',
    '/privacy-policy',
    '/secure-shopping',
    '/shipping-and-return',
    '/cart',
    '/checkout',
  ];

  const productSlugs = await fetchProductSlugs();

  const dynamicRoutes = [
    ...productSlugs.map(slug => `/products/${slug}`),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const urls = allRoutes.map(route => {
    return `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
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
