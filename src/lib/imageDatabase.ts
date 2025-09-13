// Advanced Image Database System with AI-like categorization

export interface ImageMetadata {
  id: string;
  filename: string;
  path: string;
  hash: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  aspectRatio: number;
  format: string;
  dominantColor: {
    r: number;
    g: number;
    b: number;
  };
  brightness: number;
  contrast: number;
  saturation: number;
  category: string;
  tags: string[];
  semantic: {
    themes: string[];
    mood: string;
    style: string;
  };
  visualFeatures: {
    hasText: boolean;
    hasFaces: boolean;
    isMonochrome: boolean;
    complexity: 'simple' | 'moderate' | 'complex';
    composition: string;
  };
  relatedImages: string[];
  score: number;
  views: number;
  likes: number;
  createdAt: Date;
  processedAt: Date;
}

export interface ImageCollection {
  id: string;
  name: string;
  description: string;
  images: string[]; // Image IDs
  featured: string; // Featured image ID
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class ImageDatabase {
  private images: Map<string, ImageMetadata> = new Map();
  private collections: Map<string, ImageCollection> = new Map();
  private tagIndex: Map<string, Set<string>> = new Map();
  private categoryIndex: Map<string, Set<string>> = new Map();
  private colorIndex: Map<string, Set<string>> = new Map();
  private searchIndex: Map<string, Set<string>> = new Map();

  constructor() {
    this.initialize();
  }

  private async initialize() {
    // Load pre-analyzed data if exists
    try {
      const data = await this.loadDatabase();
      if (data) {
        this.hydrateDatabase(data);
      }
    } catch (error) {
      console.error('Failed to load image database:', error);
    }
  }

  private async loadDatabase(): Promise<any> {
    // In production, this would load from a real database
    // For now, we'll use a JSON file or generate mock data
    return null;
  }

  private hydrateDatabase(data: any) {
    // Populate all indexes from loaded data
    data.images?.forEach((img: ImageMetadata) => {
      this.addImage(img);
    });

    data.collections?.forEach((col: ImageCollection) => {
      this.collections.set(col.id, col);
    });
  }

  addImage(image: ImageMetadata) {
    this.images.set(image.id, image);

    // Update tag index
    image.tags.forEach(tag => {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag)!.add(image.id);
    });

    // Update category index
    if (!this.categoryIndex.has(image.category)) {
      this.categoryIndex.set(image.category, new Set());
    }
    this.categoryIndex.get(image.category)!.add(image.id);

    // Update color index (quantized color buckets)
    const colorKey = this.quantizeColor(image.dominantColor);
    if (!this.colorIndex.has(colorKey)) {
      this.colorIndex.set(colorKey, new Set());
    }
    this.colorIndex.get(colorKey)!.add(image.id);

    // Update search index
    this.updateSearchIndex(image);
  }

  private quantizeColor(color: { r: number; g: number; b: number }): string {
    // Quantize to 64 color buckets for efficient color-based search
    const levels = 4;
    const r = Math.floor(color.r / (256 / levels));
    const g = Math.floor(color.g / (256 / levels));
    const b = Math.floor(color.b / (256 / levels));
    return `${r}-${g}-${b}`;
  }

  private updateSearchIndex(image: ImageMetadata) {
    // Create searchable tokens from image metadata
    const tokens = [
      ...image.filename.toLowerCase().split(/[\s_-]/),
      ...image.tags,
      ...image.semantic.themes,
      image.category,
      image.semantic.mood,
      image.semantic.style
    ];

    tokens.forEach(token => {
      if (token && token.length > 2) {
        if (!this.searchIndex.has(token)) {
          this.searchIndex.set(token, new Set());
        }
        this.searchIndex.get(token)!.add(image.id);
      }
    });
  }

  // Advanced search with multiple criteria
  search(query: {
    text?: string;
    tags?: string[];
    category?: string;
    color?: { r: number; g: number; b: number };
    minBrightness?: number;
    maxBrightness?: number;
    aspectRatio?: { min: number; max: number };
    limit?: number;
    offset?: number;
    sortBy?: 'relevance' | 'date' | 'views' | 'likes' | 'random';
  }): ImageMetadata[] {
    let results = new Set<string>();
    let initialized = false;

    // Text search
    if (query.text) {
      const tokens = query.text.toLowerCase().split(/\s+/);
      tokens.forEach(token => {
        const matches = this.searchIndex.get(token);
        if (matches) {
          if (!initialized) {
            results = new Set(matches);
            initialized = true;
          } else {
            // Intersection for AND search
            results = new Set([...results].filter(x => matches.has(x)));
          }
        }
      });
    }

    // Tag filter
    if (query.tags && query.tags.length > 0) {
      const tagResults = new Set<string>();
      query.tags.forEach(tag => {
        const matches = this.tagIndex.get(tag);
        if (matches) {
          matches.forEach(id => tagResults.add(id));
        }
      });

      if (!initialized) {
        results = tagResults;
        initialized = true;
      } else {
        results = new Set([...results].filter(x => tagResults.has(x)));
      }
    }

    // Category filter
    if (query.category) {
      const categoryMatches = this.categoryIndex.get(query.category);
      if (categoryMatches) {
        if (!initialized) {
          results = new Set(categoryMatches);
          initialized = true;
        } else {
          results = new Set([...results].filter(x => categoryMatches.has(x)));
        }
      }
    }

    // Color similarity search
    if (query.color) {
      const colorKey = this.quantizeColor(query.color);
      const colorMatches = this.colorIndex.get(colorKey);
      if (colorMatches) {
        if (!initialized) {
          results = new Set(colorMatches);
          initialized = true;
        } else {
          results = new Set([...results].filter(x => colorMatches.has(x)));
        }
      }
    }

    // If no filters, return all
    if (!initialized) {
      results = new Set(this.images.keys());
    }

    // Apply additional filters
    let filteredImages = Array.from(results)
      .map(id => this.images.get(id)!)
      .filter(img => {
        if (query.minBrightness && img.brightness < query.minBrightness) return false;
        if (query.maxBrightness && img.brightness > query.maxBrightness) return false;
        if (query.aspectRatio) {
          if (img.aspectRatio < query.aspectRatio.min || img.aspectRatio > query.aspectRatio.max) {
            return false;
          }
        }
        return true;
      });

    // Sort results
    filteredImages = this.sortImages(filteredImages, query.sortBy || 'relevance');

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 50;
    return filteredImages.slice(offset, offset + limit);
  }

  private sortImages(images: ImageMetadata[], sortBy: string): ImageMetadata[] {
    switch (sortBy) {
      case 'date':
        return images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'views':
        return images.sort((a, b) => b.views - a.views);
      case 'likes':
        return images.sort((a, b) => b.likes - a.likes);
      case 'random':
        return images.sort(() => Math.random() - 0.5);
      case 'relevance':
      default:
        return images.sort((a, b) => b.score - a.score);
    }
  }

  // Find similar images using multiple factors
  findSimilar(imageId: string, limit: number = 10): ImageMetadata[] {
    const sourceImage = this.images.get(imageId);
    if (!sourceImage) return [];

    const similarities = new Map<string, number>();

    // Calculate similarity scores for all other images
    this.images.forEach((image, id) => {
      if (id === imageId) return;

      let score = 0;

      // Category similarity
      if (image.category === sourceImage.category) score += 10;

      // Tag similarity (Jaccard index)
      const tagIntersection = image.tags.filter(t => sourceImage.tags.includes(t)).length;
      const tagUnion = new Set([...image.tags, ...sourceImage.tags]).size;
      score += (tagIntersection / tagUnion) * 20;

      // Color similarity
      const colorDistance = this.calculateColorDistance(image.dominantColor, sourceImage.dominantColor);
      score += Math.max(0, 10 - colorDistance / 25);

      // Brightness similarity
      const brightnessDiff = Math.abs(image.brightness - sourceImage.brightness);
      score += Math.max(0, 5 - brightnessDiff / 50);

      // Aspect ratio similarity
      const aspectDiff = Math.abs(image.aspectRatio - sourceImage.aspectRatio);
      score += Math.max(0, 5 - aspectDiff * 2);

      // Semantic theme similarity
      const themeIntersection = image.semantic.themes.filter(t =>
        sourceImage.semantic.themes.includes(t)
      ).length;
      score += themeIntersection * 5;

      similarities.set(id, score);
    });

    // Sort by similarity score and return top results
    return Array.from(similarities.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.images.get(id)!);
  }

  private calculateColorDistance(c1: any, c2: any): number {
    // Euclidean distance in RGB space
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
    );
  }

  // Get trending images based on views and likes
  getTrending(limit: number = 20): ImageMetadata[] {
    return Array.from(this.images.values())
      .map(img => ({
        ...img,
        trendScore: img.views * 0.3 + img.likes * 0.7 +
                   (Date.now() - img.createdAt.getTime()) / (1000 * 60 * 60 * 24) * -0.1
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit);
  }

  // Get recommendations based on user interaction history
  getRecommendations(viewedImages: string[], likedImages: string[], limit: number = 30): ImageMetadata[] {
    const recommendations = new Map<string, number>();

    // Analyze user preferences
    const preferredTags = new Map<string, number>();
    const preferredCategories = new Map<string, number>();

    [...viewedImages, ...likedImages].forEach(id => {
      const img = this.images.get(id);
      if (img) {
        img.tags.forEach(tag => {
          preferredTags.set(tag, (preferredTags.get(tag) || 0) + 1);
        });
        preferredCategories.set(img.category, (preferredCategories.get(img.category) || 0) + 1);
      }
    });

    // Score all images based on preferences
    this.images.forEach((img, id) => {
      if (viewedImages.includes(id)) return; // Don't recommend already viewed

      let score = 0;

      // Tag preference score
      img.tags.forEach(tag => {
        score += (preferredTags.get(tag) || 0) * 2;
      });

      // Category preference score
      score += (preferredCategories.get(img.category) || 0) * 5;

      // Boost for liked images' similar items
      likedImages.forEach(likedId => {
        const similar = this.findSimilar(likedId, 5);
        if (similar.some(s => s.id === id)) {
          score += 10;
        }
      });

      // Diversity bonus (avoid too similar recommendations)
      const alreadyRecommended = Array.from(recommendations.keys()).slice(0, 10);
      const tooSimilar = alreadyRecommended.some(recId => {
        const recImg = this.images.get(recId);
        return recImg && recImg.category === img.category &&
               recImg.tags.filter(t => img.tags.includes(t)).length > 3;
      });
      if (tooSimilar) score *= 0.5;

      recommendations.set(id, score);
    });

    return Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.images.get(id)!);
  }

  // Create dynamic collections
  createAutoCollection(name: string, criteria: any): ImageCollection {
    const images = this.search(criteria);
    const collection: ImageCollection = {
      id: `auto-${Date.now()}`,
      name,
      description: `Auto-generated collection based on: ${JSON.stringify(criteria)}`,
      images: images.map(img => img.id),
      featured: images[0]?.id || '',
      tags: [...new Set(images.flatMap(img => img.tags))].slice(0, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.collections.set(collection.id, collection);
    return collection;
  }

  // Export statistics
  getStatistics() {
    const stats = {
      totalImages: this.images.size,
      totalCollections: this.collections.size,
      categories: {} as Record<string, number>,
      topTags: [] as { tag: string; count: number }[],
      averageBrightness: 0,
      averageFileSize: 0,
      dimensionDistribution: {
        landscape: 0,
        portrait: 0,
        square: 0
      }
    };

    let totalBrightness = 0;
    let totalFileSize = 0;

    this.images.forEach(img => {
      // Category stats
      stats.categories[img.category] = (stats.categories[img.category] || 0) + 1;

      // Brightness and size
      totalBrightness += img.brightness;
      totalFileSize += img.fileSize;

      // Dimension distribution
      if (img.aspectRatio > 1.2) {
        stats.dimensionDistribution.landscape++;
      } else if (img.aspectRatio < 0.8) {
        stats.dimensionDistribution.portrait++;
      } else {
        stats.dimensionDistribution.square++;
      }
    });

    stats.averageBrightness = totalBrightness / this.images.size;
    stats.averageFileSize = totalFileSize / this.images.size;

    // Top tags
    const tagCounts = new Map<string, number>();
    this.tagIndex.forEach((images, tag) => {
      tagCounts.set(tag, images.size);
    });
    stats.topTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));

    return stats;
  }
}

// Singleton instance
export const imageDB = new ImageDatabase();