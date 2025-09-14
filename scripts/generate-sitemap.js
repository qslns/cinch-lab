const fs = require('fs')
const path = require('path')

// Static pages
const staticPages = [
  '/',
  '/about',
  '/archive',
  '/chaos',
  '/collections',
  '/contact',
  '/distortion',
  '/extreme',
  '/gallery',
  '/lab',
  '/runway',
  '/void'
]

// Dynamic pages (example IDs - replace with actual data)
const dynamicPages = {
  collections: ['ss24', 'fw24', 'resort24', 'capsule01'],
  products: ['product-001', 'product-002', 'product-003']
}

function generateSitemap() {
  const baseUrl = 'https://cinch-lab.vercel.app'
  const currentDate = new Date().toISOString().split('T')[0]

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`

  // Add static pages
  staticPages.forEach(page => {
    const priority = page === '/' ? '1.0' : '0.8'
    const changefreq = page === '/' ? 'daily' : 'weekly'

    sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  })

  // Add dynamic collection pages
  dynamicPages.collections.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/collections/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })

  // Add dynamic product pages
  dynamicPages.products.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/product/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  // Write sitemap to public directory
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemap)

  console.log('✅ Sitemap generated successfully at public/sitemap.xml')

  // Generate sitemap index if needed (for large sites)
  generateSitemapIndex()
}

function generateSitemapIndex() {
  const baseUrl = 'https://cinch-lab.vercel.app'
  const currentDate = new Date().toISOString()

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`

  const indexPath = path.join(__dirname, '..', 'public', 'sitemap-index.xml')
  fs.writeFileSync(indexPath, sitemapIndex)

  console.log('✅ Sitemap index generated at public/sitemap-index.xml')
}

// Run the generator
generateSitemap()