const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images/gallery');
const outputDir = path.join(__dirname, '../public/images/gallery-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename);

  try {
    // Skip if already optimized
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`Skipping ${filename} (already optimized)`);
        return;
      }
    }

    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 80,
        progressive: true
      })
      .toFile(outputPath.replace('.png', '.jpg'));

    console.log(`Optimized ${filename}`);
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

  console.log(`Found ${files.length} images to optimize`);

  // Process in batches to avoid memory issues
  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, Math.min(i + batchSize, files.length));
    await Promise.all(batch.map(file => optimizeImage(file)));
    console.log(`Progress: ${Math.min(i + batchSize, files.length)} / ${files.length}`);
  }

  console.log('Image optimization complete!');

  // Update the images.json with new file extensions
  const imagesJsonPath = path.join(__dirname, '../src/data/images.json');
  let imagesData = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
  imagesData = imagesData.map(filename => filename.replace('.png', '.jpg'));
  fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesData, null, 2));
  console.log('Updated images.json with optimized filenames');
}

optimizeAllImages().catch(console.error);