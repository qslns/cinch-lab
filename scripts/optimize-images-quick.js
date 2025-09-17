const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images/gallery');

async function optimizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = inputPath.replace('.png', '-opt.jpg');

  try {
    // Skip if already optimized
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${filename} (already optimized)`);
      return;
    }

    await sharp(inputPath)
      .resize(600, 600, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 75,
        progressive: true
      })
      .toFile(outputPath);

    // Delete original and rename optimized
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath.replace('.png', '.jpg'));

    console.log(`Optimized ${filename}`);
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function optimizeFirstBatch() {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

  console.log(`Found ${files.length} PNG images. Optimizing first 50...`);

  // Process only first 50 images as a test
  const testBatch = files.slice(0, 50);

  // Process in small batches
  const batchSize = 5;
  for (let i = 0; i < testBatch.length; i += batchSize) {
    const batch = testBatch.slice(i, Math.min(i + batchSize, testBatch.length));
    await Promise.all(batch.map(file => optimizeImage(file)));
    console.log(`Progress: ${Math.min(i + batchSize, testBatch.length)} / ${testBatch.length}`);
  }

  // Update the images.json for optimized files
  const imagesJsonPath = path.join(__dirname, '../src/data/images.json');
  let imagesData = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));

  // Update only the first 50 entries
  for (let i = 0; i < Math.min(50, imagesData.length); i++) {
    if (imagesData[i].endsWith('.png')) {
      imagesData[i] = imagesData[i].replace('.png', '.jpg');
    }
  }

  fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesData, null, 2));
  console.log('Optimization complete for first batch!');
}

optimizeFirstBatch().catch(console.error);