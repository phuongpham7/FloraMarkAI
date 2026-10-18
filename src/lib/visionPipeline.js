import { AutoModelForImageClassification, AutoProcessor, RawImage, env } from "@huggingface/transformers";

env.allowLocalModels = false;

class VisionPipelineSingleton {
  constructor() {
    this.model = null;
    this.processor = null;
    this.isInitializing = false;
  }

  async getInstance(progressCallback) {
    if (this.model && this.processor) {
      return { model: this.model, processor: this.processor };
    }

    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return { model: this.model, processor: this.processor };
    }

    try {
      this.isInitializing = true;
      const modelId = "Xenova/deit-tiny-distilled-patch16-224";

      // Load processor and classifier directly without pipeline wrapper tokenizer checks
      this.processor = await AutoProcessor.from_pretrained(modelId, {
        progress_callback: progressCallback,
      });

      this.model = await AutoModelForImageClassification.from_pretrained(modelId, {
        device: "webgpu",
        progress_callback: progressCallback,
      });

      return { model: this.model, processor: this.processor };
    } finally {
      this.isInitializing = false;
    }
  }

  async classify(imageSrc, progressCallback) {
    const { model, processor } = await this.getInstance(progressCallback);
    
    const image = await RawImage.read(imageSrc);
    const inputs = await processor(image);
    const outputs = await model(inputs);
    
    // Extract logits output tensor
    const logits = outputs.logits || outputs[Object.keys(outputs)[0]];
    
    // Compute softmax scores across logits data array safely
    const data = logits.data;
    const maxLogit = Math.max(...data);
    const scores = data.map(v => Math.exp(v - maxLogit));
    const sumScores = scores.reduce((a, b) => a + b, 0);
    const probs = scores.map(s => s / sumScores);

    const topResults = Array.from(probs)
      .map((score, idx) => ({ score, idx }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const labels = model.config.id2label;
    return topResults.map(r => ({
      label: labels ? labels[r.idx] : `Class ${r.idx}`,
      score: r.score
    }));
  }
}

export const visionSingleton = new VisionPipelineSingleton();