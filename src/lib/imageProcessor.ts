// Advanced Real-time Image Processing Pipeline
// Using Web Workers for non-blocking processing

export interface ProcessingOptions {
  filters?: {
    blur?: number
    brightness?: number
    contrast?: number
    saturation?: number
    hue?: number
    grayscale?: boolean
    invert?: boolean
    sepia?: boolean
  }
  effects?: {
    glitch?: boolean
    pixelate?: number
    noise?: number
    vignette?: number
    chromatic?: boolean
    kaleidoscope?: number
    datamosh?: boolean
  }
  transforms?: {
    scale?: number
    rotate?: number
    skewX?: number
    skewY?: number
    flipX?: boolean
    flipY?: boolean
  }
  advanced?: {
    edgeDetection?: boolean
    oilPainting?: boolean
    crystallize?: number
    mosaic?: number
    displacement?: boolean
    liquify?: { x: number; y: number; radius: number; strength: number }[]
  }
}

export class ImageProcessor {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private offscreenCanvas: OffscreenCanvas | null = null
  private offscreenCtx: OffscreenCanvasRenderingContext2D | null = null
  private worker: Worker | null = null
  private processingQueue: Array<{ id: string; options: ProcessingOptions }> = []
  private isProcessing = false

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', {
      willReadFrequently: true,
      alpha: true
    })!

    // Initialize offscreen canvas if available
    if (typeof OffscreenCanvas !== 'undefined') {
      this.offscreenCanvas = new OffscreenCanvas(1, 1)
      this.offscreenCtx = this.offscreenCanvas.getContext('2d')!
    }

    // Initialize web worker for heavy processing
    this.initializeWorker()
  }

  private initializeWorker() {
    const workerCode = `
      self.onmessage = function(e) {
        const { imageData, options, id } = e.data;
        const processed = processImageData(imageData, options);
        self.postMessage({ processed, id });
      };

      function processImageData(imageData, options) {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;

        // Apply filters
        if (options.filters) {
          applyFilters(data, width, height, options.filters);
        }

        // Apply effects
        if (options.effects) {
          applyEffects(data, width, height, options.effects);
        }

        return imageData;
      }

      function applyFilters(data, width, height, filters) {
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];
          let a = data[i + 3];

          // Brightness
          if (filters.brightness) {
            r = Math.min(255, r * filters.brightness);
            g = Math.min(255, g * filters.brightness);
            b = Math.min(255, b * filters.brightness);
          }

          // Contrast
          if (filters.contrast) {
            r = ((r / 255 - 0.5) * filters.contrast + 0.5) * 255;
            g = ((g / 255 - 0.5) * filters.contrast + 0.5) * 255;
            b = ((b / 255 - 0.5) * filters.contrast + 0.5) * 255;
          }

          // Grayscale
          if (filters.grayscale) {
            const gray = r * 0.299 + g * 0.587 + b * 0.114;
            r = g = b = gray;
          }

          // Invert
          if (filters.invert) {
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
          }

          // Sepia
          if (filters.sepia) {
            const tr = 0.393 * r + 0.769 * g + 0.189 * b;
            const tg = 0.349 * r + 0.686 * g + 0.168 * b;
            const tb = 0.272 * r + 0.534 * g + 0.131 * b;
            r = Math.min(255, tr);
            g = Math.min(255, tg);
            b = Math.min(255, tb);
          }

          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }
      }

      function applyEffects(data, width, height, effects) {
        // Glitch effect
        if (effects.glitch) {
          const glitchLines = Math.floor(Math.random() * 10);
          for (let i = 0; i < glitchLines; i++) {
            const y = Math.floor(Math.random() * height);
            const shift = Math.floor(Math.random() * 20) - 10;
            glitchLine(data, width, height, y, shift);
          }
        }

        // Pixelate
        if (effects.pixelate) {
          pixelate(data, width, height, effects.pixelate);
        }

        // Noise
        if (effects.noise) {
          addNoise(data, effects.noise);
        }
      }

      function glitchLine(data, width, height, y, shift) {
        const lineStart = y * width * 4;
        const lineEnd = lineStart + width * 4;
        const temp = [];

        for (let i = lineStart; i < lineEnd; i += 4) {
          temp.push(data[i], data[i + 1], data[i + 2], data[i + 3]);
        }

        for (let i = 0; i < temp.length; i += 4) {
          const targetIndex = lineStart + ((i / 4 + shift + width) % width) * 4;
          data[targetIndex] = temp[i];
          data[targetIndex + 1] = temp[i + 1];
          data[targetIndex + 2] = temp[i + 2];
          data[targetIndex + 3] = temp[i + 3];
        }
      }

      function pixelate(data, width, height, size) {
        for (let y = 0; y < height; y += size) {
          for (let x = 0; x < width; x += size) {
            const pixel = getAveragePixel(data, width, x, y, size);
            fillBlock(data, width, x, y, size, pixel);
          }
        }
      }

      function getAveragePixel(data, width, x, y, size) {
        let r = 0, g = 0, b = 0, count = 0;
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        return { r: r / count, g: g / count, b: b / count };
      }

      function fillBlock(data, width, x, y, size, pixel) {
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            data[i] = pixel.r;
            data[i + 1] = pixel.g;
            data[i + 2] = pixel.b;
          }
        }
      }

      function addNoise(data, intensity) {
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * intensity * 255;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
      }
    `

    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const workerUrl = URL.createObjectURL(blob)
    this.worker = new Worker(workerUrl)

    this.worker.onmessage = (e) => {
      const { processed, id } = e.data
      this.handleProcessedImage(processed, id)
    }
  }

  async processImage(
    image: HTMLImageElement | ImageBitmap | Blob,
    options: ProcessingOptions
  ): Promise<ImageData> {
    // Set canvas size
    if (image instanceof HTMLImageElement || image instanceof ImageBitmap) {
      this.canvas.width = image.width
      this.canvas.height = image.height
      this.ctx.drawImage(image, 0, 0)
    } else if (image instanceof Blob) {
      const bitmap = await createImageBitmap(image)
      this.canvas.width = bitmap.width
      this.canvas.height = bitmap.height
      this.ctx.drawImage(bitmap, 0, 0)
    }

    // Get image data
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

    // Apply transformations first (these use canvas transforms)
    if (options.transforms) {
      this.applyTransforms(options.transforms)
    }

    // Process filters and effects
    if (this.worker && (options.filters || options.effects)) {
      return new Promise((resolve) => {
        const id = Math.random().toString(36)
        this.processingQueue.push({ id, options })

        const handler = (e: MessageEvent) => {
          if (e.data.id === id) {
            this.worker?.removeEventListener('message', handler)
            resolve(e.data.processed)
          }
        }

        this.worker?.addEventListener('message', handler)
        this.worker?.postMessage({ imageData, options, id })
      })
    }

    // Apply advanced effects that require canvas operations
    if (options.advanced) {
      await this.applyAdvancedEffects(imageData, options.advanced)
    }

    return imageData
  }

  private applyTransforms(transforms: ProcessingOptions['transforms']) {
    if (!transforms) return

    this.ctx.save()

    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    this.ctx.translate(centerX, centerY)

    if (transforms.rotate) {
      this.ctx.rotate(transforms.rotate * Math.PI / 180)
    }

    if (transforms.scale) {
      this.ctx.scale(transforms.scale, transforms.scale)
    }

    if (transforms.skewX || transforms.skewY) {
      this.ctx.transform(1, transforms.skewY || 0, transforms.skewX || 0, 1, 0, 0)
    }

    if (transforms.flipX) {
      this.ctx.scale(-1, 1)
    }

    if (transforms.flipY) {
      this.ctx.scale(1, -1)
    }

    this.ctx.translate(-centerX, -centerY)

    // Redraw the transformed image
    const tempData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.putImageData(tempData, 0, 0)

    this.ctx.restore()
  }

  private async applyAdvancedEffects(
    imageData: ImageData,
    advanced: ProcessingOptions['advanced']
  ) {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height

    // Edge detection using Sobel operator
    if (advanced?.edgeDetection) {
      this.applySobelEdgeDetection(data, width, height)
    }

    // Oil painting effect
    if (advanced?.oilPainting) {
      this.applyOilPaintingEffect(data, width, height)
    }

    // Crystallize effect
    if (advanced?.crystallize) {
      this.applyCrystallizeEffect(data, width, height, advanced.crystallize)
    }

    // Displacement map effect
    if (advanced?.displacement) {
      this.applyDisplacementMap(data, width, height)
    }

    // Liquify effect
    if (advanced?.liquify) {
      this.applyLiquifyEffect(data, width, height, advanced.liquify)
    }
  }

  private applySobelEdgeDetection(data: Uint8ClampedArray, width: number, height: number) {
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]
    const output = new Uint8ClampedArray(data)

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let pixelX = 0
        let pixelY = 0

        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            const idx = ((y + j) * width + (x + i)) * 4
            const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114
            const kernelIdx = (j + 1) * 3 + (i + 1)
            pixelX += gray * sobelX[kernelIdx]
            pixelY += gray * sobelY[kernelIdx]
          }
        }

        const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY)
        const idx = (y * width + x) * 4
        output[idx] = output[idx + 1] = output[idx + 2] = Math.min(255, magnitude)
      }
    }

    data.set(output)
  }

  private applyOilPaintingEffect(data: Uint8ClampedArray, width: number, height: number) {
    const radius = 4
    const intensity = 20
    const output = new Uint8ClampedArray(data)

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const intensityCount = new Array(intensity + 1).fill(0)
        const avgR = new Array(intensity + 1).fill(0)
        const avgG = new Array(intensity + 1).fill(0)
        const avgB = new Array(intensity + 1).fill(0)

        for (let j = -radius; j <= radius; j++) {
          for (let i = -radius; i <= radius; i++) {
            const idx = ((y + j) * width + (x + i)) * 4
            const curIntensity = Math.floor(
              ((data[idx] + data[idx + 1] + data[idx + 2]) / 3) * intensity / 255
            )
            intensityCount[curIntensity]++
            avgR[curIntensity] += data[idx]
            avgG[curIntensity] += data[idx + 1]
            avgB[curIntensity] += data[idx + 2]
          }
        }

        let maxIntensity = 0
        let maxIndex = 0
        for (let i = 0; i <= intensity; i++) {
          if (intensityCount[i] > maxIntensity) {
            maxIntensity = intensityCount[i]
            maxIndex = i
          }
        }

        const idx = (y * width + x) * 4
        output[idx] = avgR[maxIndex] / maxIntensity
        output[idx + 1] = avgG[maxIndex] / maxIntensity
        output[idx + 2] = avgB[maxIndex] / maxIntensity
      }
    }

    data.set(output)
  }

  private applyCrystallizeEffect(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    cellSize: number
  ) {
    const cells = []

    // Generate random cell centers
    for (let y = 0; y < height; y += cellSize) {
      for (let x = 0; x < width; x += cellSize) {
        cells.push({
          x: x + Math.random() * cellSize,
          y: y + Math.random() * cellSize,
          r: 0, g: 0, b: 0, count: 0
        })
      }
    }

    // Assign pixels to nearest cell
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let minDist = Infinity
        let nearestCell = cells[0]

        for (const cell of cells) {
          const dist = Math.sqrt((x - cell.x) ** 2 + (y - cell.y) ** 2)
          if (dist < minDist) {
            minDist = dist
            nearestCell = cell
          }
        }

        const idx = (y * width + x) * 4
        nearestCell.r += data[idx]
        nearestCell.g += data[idx + 1]
        nearestCell.b += data[idx + 2]
        nearestCell.count++
      }
    }

    // Calculate average colors
    for (const cell of cells) {
      if (cell.count > 0) {
        cell.r /= cell.count
        cell.g /= cell.count
        cell.b /= cell.count
      }
    }

    // Apply colors
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let minDist = Infinity
        let nearestCell = cells[0]

        for (const cell of cells) {
          const dist = Math.sqrt((x - cell.x) ** 2 + (y - cell.y) ** 2)
          if (dist < minDist) {
            minDist = dist
            nearestCell = cell
          }
        }

        const idx = (y * width + x) * 4
        data[idx] = nearestCell.r
        data[idx + 1] = nearestCell.g
        data[idx + 2] = nearestCell.b
      }
    }
  }

  private applyDisplacementMap(data: Uint8ClampedArray, width: number, height: number) {
    const output = new Uint8ClampedArray(data)
    const displacementStrength = 20

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4

        // Use red channel as displacement map
        const displacement = (data[idx] / 255 - 0.5) * displacementStrength

        const sourceX = Math.min(width - 1, Math.max(0, x + displacement))
        const sourceY = Math.min(height - 1, Math.max(0, y + displacement))
        const sourceIdx = (Math.floor(sourceY) * width + Math.floor(sourceX)) * 4

        output[idx] = data[sourceIdx]
        output[idx + 1] = data[sourceIdx + 1]
        output[idx + 2] = data[sourceIdx + 2]
        output[idx + 3] = data[sourceIdx + 3]
      }
    }

    data.set(output)
  }

  private applyLiquifyEffect(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    points: Array<{ x: number; y: number; radius: number; strength: number }>
  ) {
    const output = new Uint8ClampedArray(data)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let offsetX = 0
        let offsetY = 0

        for (const point of points) {
          const dx = x - point.x
          const dy = y - point.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < point.radius) {
            const factor = (1 - dist / point.radius) * point.strength
            offsetX += dx * factor
            offsetY += dy * factor
          }
        }

        const sourceX = Math.min(width - 1, Math.max(0, x - offsetX))
        const sourceY = Math.min(height - 1, Math.max(0, y - offsetY))
        const sourceIdx = (Math.floor(sourceY) * width + Math.floor(sourceX)) * 4
        const targetIdx = (y * width + x) * 4

        output[targetIdx] = data[sourceIdx]
        output[targetIdx + 1] = data[sourceIdx + 1]
        output[targetIdx + 2] = data[sourceIdx + 2]
        output[targetIdx + 3] = data[sourceIdx + 3]
      }
    }

    data.set(output)
  }

  private handleProcessedImage(imageData: ImageData, id: string) {
    // Handle the processed image data
    // This could emit an event, call a callback, or update a store
    this.isProcessing = false
    this.processNext()
  }

  private processNext() {
    if (this.isProcessing || this.processingQueue.length === 0) return

    const next = this.processingQueue.shift()
    if (next) {
      this.isProcessing = true
      // Process the next item in queue
    }
  }

  // Batch processing for multiple images
  async batchProcess(
    images: Array<HTMLImageElement | ImageBitmap>,
    options: ProcessingOptions
  ): Promise<ImageData[]> {
    const results: ImageData[] = []

    for (const image of images) {
      const processed = await this.processImage(image, options)
      results.push(processed)
    }

    return results
  }

  // Real-time video processing
  processVideo(
    video: HTMLVideoElement,
    options: ProcessingOptions,
    callback: (frame: ImageData) => void
  ) {
    const processFrame = () => {
      if (video.paused || video.ended) return

      this.canvas.width = video.videoWidth
      this.canvas.height = video.videoHeight
      this.ctx.drawImage(video, 0, 0)

      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

      this.processImage(imageData as any, options).then(processed => {
        callback(processed)
        requestAnimationFrame(processFrame)
      })
    }

    processFrame()
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }
}

// Export singleton instance
export const imageProcessor = new ImageProcessor()