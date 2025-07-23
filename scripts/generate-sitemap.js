const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const baseUrl = 'https://caraudioexpert.com.au'; 

(async () => {
  const sitemap = new SitemapStream({ hostname: baseUrl });

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  // Pipe sitemap stream to file stream
  sitemap.pipe(writeStream);

  // Add static routes
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });

  // Example dynamic routes
  const blogPosts = [
    { slug: 'hello-world' },
    { slug: 'nextjs-sitemap-guide' },
  ];

  blogPosts.forEach(post => {
    sitemap.write({ url: `/blog/${post.slug}`, changefreq: 'weekly', priority: 0.7 });
  });

  sitemap.end();

  // ✅ Pass the SitemapStream, not the write stream
  await streamToPromise(sitemap);

  console.log('✅ Sitemap generated at:', sitemapPath);
})();
