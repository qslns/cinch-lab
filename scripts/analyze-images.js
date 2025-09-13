const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

class ImageAnalyzer {
  constructor(imageDir) {
    this.imageDir = imageDir;
    this.imageDatabase = [];
    this.categories = new Map();
  }

  async analyzeAllImages() {
    console.log('🔍 Starting comprehensive image analysis...');
    const files = fs.readdirSync(this.imageDir);

    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        await this.analyzeImage(file);
      }
    }

    return this.generateReport();
  }

  async analyzeImage(filename) {
    const filepath = path.join(this.imageDir, filename);
    const stats = fs.statSync(filepath);

    try {
      const metadata = await sharp(filepath).metadata();
      const { dominant } = await sharp(filepath).stats();

      // Generate hash for duplicate detection
      const fileBuffer = fs.readFileSync(filepath);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

      // Extract semantic information from filename
      const semanticData = this.extractSemanticData(filename);

      // Calculate visual properties
      const visualProperties = {
        aspectRatio: metadata.width / metadata.height,
        megapixels: (metadata.width * metadata.height) / 1000000,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha,
        density: metadata.density || 72,
        dominantColor: dominant,
        brightness: this.calculateBrightness(dominant),
        isMonochrome: this.checkMonochrome(dominant)
      };

      // Categorize image
      const category = this.categorizeImage(semanticData, visualProperties);

      const imageData = {
        filename,
        path: filepath,
        hash,
        fileSize: stats.size,
        dimensions: {
          width: metadata.width,
          height: metadata.height
        },
        format: metadata.format,
        ...visualProperties,
        semantic: semanticData,
        category,
        tags: this.generateTags(semanticData, visualProperties),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime
      };

      this.imageDatabase.push(imageData);

      // Update category map
      if (!this.categories.has(category)) {
        this.categories.set(category, []);
      }
      this.categories.get(category).push(filename);

      console.log(`✅ Analyzed: ${filename} - Category: ${category}`);
    } catch (error) {
      console.error(`❌ Error analyzing ${filename}:`, error.message);
    }
  }

  extractSemanticData(filename) {
    // Extract meaningful data from filename patterns
    const patterns = {
      abandoned: /abandoned|decay|ruins/i,
      abstract: /abstract|composition|pattern/i,
      architectural: /bridge|tunnel|terminal|building/i,
      organic: /organic|bacterial|botanical|garden/i,
      human: /human|figure|portrait|body/i,
      crystalline: /crystal|lattice|fractal/i,
      atmospheric: /smoke|vapor|melt|flow/i,
      technological: /electronic|digital|cyber/i,
      surreal: /distort|warp|impossible|paradox/i,
      natural: /forest|desert|canyon|arctic|ocean/i
    };

    const detected = [];
    for (const [key, pattern] of Object.entries(patterns)) {
      if (pattern.test(filename)) {
        detected.push(key);
      }
    }

    return {
      themes: detected,
      isExperimental: filename.includes('qslna'),
      hasMultipleVariants: /_\d+\./.test(filename)
    };
  }

  categorizeImage(semantic, visual) {
    // Smart categorization based on multiple factors
    if (semantic.themes.includes('abstract') && visual.brightness > 150) {
      return 'light-abstract';
    }
    if (semantic.themes.includes('abstract') && visual.brightness < 100) {
      return 'dark-abstract';
    }
    if (semantic.themes.includes('architectural')) {
      return 'architectural';
    }
    if (semantic.themes.includes('human') || semantic.themes.includes('portrait')) {
      return 'human-form';
    }
    if (semantic.themes.includes('organic') || semantic.themes.includes('natural')) {
      return 'organic-nature';
    }
    if (semantic.themes.includes('technological') || semantic.themes.includes('digital')) {
      return 'tech-digital';
    }
    if (semantic.themes.includes('surreal') || semantic.themes.includes('distort')) {
      return 'surreal-distorted';
    }
    if (visual.isMonochrome) {
      return 'monochrome';
    }
    if (visual.aspectRatio > 1.5) {
      return 'panoramic';
    }
    if (visual.aspectRatio < 0.7) {
      return 'portrait-orientation';
    }

    return 'uncategorized';
  }

  generateTags(semantic, visual) {
    const tags = [...semantic.themes];

    if (visual.brightness > 180) tags.push('bright');
    if (visual.brightness < 80) tags.push('dark');
    if (visual.isMonochrome) tags.push('monochrome');
    if (visual.aspectRatio > 2) tags.push('ultrawide');
    if (visual.megapixels > 4) tags.push('high-resolution');
    if (visual.hasAlpha) tags.push('transparent');

    return tags;
  }

  calculateBrightness(color) {
    // Calculate perceived brightness
    return (color.r * 0.299 + color.g * 0.587 + color.b * 0.114);
  }

  checkMonochrome(color) {
    const threshold = 10;
    return Math.abs(color.r - color.g) < threshold &&
           Math.abs(color.g - color.b) < threshold;
  }

  generateReport() {
    const report = {
      totalImages: this.imageDatabase.length,
      totalSize: this.imageDatabase.reduce((acc, img) => acc + img.fileSize, 0),
      categories: Object.fromEntries(this.categories),
      formats: {},
      dimensions: {
        minWidth: Math.min(...this.imageDatabase.map(img => img.dimensions.width)),
        maxWidth: Math.max(...this.imageDatabase.map(img => img.dimensions.width)),
        minHeight: Math.min(...this.imageDatabase.map(img => img.dimensions.height)),
        maxHeight: Math.max(...this.imageDatabase.map(img => img.dimensions.height)),
        averageWidth: Math.round(this.imageDatabase.reduce((acc, img) => acc + img.dimensions.width, 0) / this.imageDatabase.length),
        averageHeight: Math.round(this.imageDatabase.reduce((acc, img) => acc + img.dimensions.height, 0) / this.imageDatabase.length)
      },
      duplicates: this.findDuplicates(),
      recommendations: this.generateRecommendations()
    };

    // Count formats
    this.imageDatabase.forEach(img => {
      if (!report.formats[img.format]) {
        report.formats[img.format] = 0;
      }
      report.formats[img.format]++;
    });

    return report;
  }

  findDuplicates() {
    const hashMap = new Map();
    const duplicates = [];

    this.imageDatabase.forEach(img => {
      if (hashMap.has(img.hash)) {
        duplicates.push({
          original: hashMap.get(img.hash),
          duplicate: img.filename
        });
      } else {
        hashMap.set(img.hash, img.filename);
      }
    });

    return duplicates;
  }

  generateRecommendations() {
    const recommendations = [];

    // Check for optimization opportunities
    const largeImages = this.imageDatabase.filter(img => img.fileSize > 1000000);
    if (largeImages.length > 0) {
      recommendations.push({
        type: 'optimization',
        message: `${largeImages.length} images are over 1MB and should be optimized`,
        images: largeImages.map(img => img.filename)
      });
    }

    // Check for missing categories
    const uncategorized = this.imageDatabase.filter(img => img.category === 'uncategorized');
    if (uncategorized.length > 0) {
      recommendations.push({
        type: 'categorization',
        message: `${uncategorized.length} images need better categorization`,
        images: uncategorized.map(img => img.filename)
      });
    }

    return recommendations;
  }

  async saveDatabase() {
    const dbPath = path.join(__dirname, '..', 'data', 'image-database.json');
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    fs.writeFileSync(dbPath, JSON.stringify({
      generated: new Date().toISOString(),
      database: this.imageDatabase,
      categories: Object.fromEntries(this.categories),
      statistics: this.generateReport()
    }, null, 2));

    console.log(`💾 Database saved to ${dbPath}`);
  }
}

// Run the analyzer
async function main() {
  const imageDir = path.join(__dirname, '..', '웹 꾸미기 사진');

  if (!fs.existsSync(imageDir)) {
    console.error('Image directory not found:', imageDir);
    process.exit(1);
  }

  const analyzer = new ImageAnalyzer(imageDir);
  const report = await analyzer.analyzeAllImages();

  console.log('\n📊 Analysis Report:');
  console.log('==================');
  console.log(`Total Images: ${report.totalImages}`);
  console.log(`Total Size: ${(report.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Categories: ${Object.keys(report.categories).length}`);
  console.log(`Formats: ${JSON.stringify(report.formats)}`);
  console.log(`Duplicates: ${report.duplicates.length}`);
  console.log('\nDimensions:');
  console.log(`  Width: ${report.dimensions.minWidth}px - ${report.dimensions.maxWidth}px (avg: ${report.dimensions.averageWidth}px)`);
  console.log(`  Height: ${report.dimensions.minHeight}px - ${report.dimensions.maxHeight}px (avg: ${report.dimensions.averageHeight}px)`);

  if (report.recommendations.length > 0) {
    console.log('\n⚠️ Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`  - ${rec.message}`);
    });
  }

  await analyzer.saveDatabase();
}

main().catch(console.error);