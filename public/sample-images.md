# Sample Image Structure

To fully experience the CINCH LAB website, add images in the following structure:

## Collections
```
/public/collections/
├── ss25/
│   ├── cover.jpg (1200x1600px - Collection cover)
│   ├── hero.jpg (1920x1080px - Hero banner)
│   ├── look-1.jpg (900x1200px)
│   ├── look-2.jpg (900x1200px)
│   ├── look-3.jpg (900x1200px)
│   └── look-4.jpg (900x1200px)
├── fw24/
│   ├── cover.jpg
│   ├── hero.jpg
│   └── look-[1-4].jpg
├── ss24/
│   └── (same structure)
└── fw23/
    └── (same structure)
```

## Products
```
/public/products/
├── ss25/
│   ├── blazer-1.jpg (800x1200px)
│   ├── blazer-2.jpg (800x1200px - hover image)
│   ├── trouser-1.jpg
│   ├── trouser-2.jpg
│   ├── dress-1.jpg
│   ├── dress-2.jpg
│   ├── coat-1.jpg
│   ├── coat-2.jpg
│   ├── shirt-1.jpg
│   ├── shirt-2.jpg
│   ├── skirt-1.jpg
│   └── skirt-2.jpg
├── fw24/
│   └── (similar product images)
├── ss24/
│   └── (similar product images)
└── fw23/
    └── (similar product images)
```

## Recommended Image Specifications
- **Format**: JPEG for photos, WebP for better compression
- **Quality**: 85-90% JPEG quality
- **Resolution**: 2x for Retina displays
- **Aspect Ratios**: 
  - Hero images: 16:9
  - Product images: 3:4
  - Lookbook images: 3:4 or 2:3

## Image Optimization Tips
1. Use Next.js Image component (already implemented)
2. Provide multiple sizes via srcset
3. Lazy load images below the fold
4. Consider using blur-up placeholders
5. Optimize file sizes (aim for <200KB per image)