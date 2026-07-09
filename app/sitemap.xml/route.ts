export async function GET() {
  const base = "https://tripleonebookings.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
  </url>
  <url>
    <loc>${base}/hotels</loc>
  </url>
  <url>
    <loc>${base}/booking</loc>
  </url>
  <url>
    <loc>${base}/contact</loc>
  </url>
  <url>
    <loc>${base}/blog/supernova-noida-complete-guide</loc>
  </url>
  <url>
    <loc>${base}/blog/supernova-3815</loc>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
