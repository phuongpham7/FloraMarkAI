import { useState, useCallback } from 'react';
import { visionSingleton } from '../lib/visionPipeline';

export function useLocalVision() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [progress, setProgress] = useState(0);

  const analyze = useCallback(async (imageSrc) => {
    setLoading(true);
    setStatus("Initializing image classifier...");
    try {
      const results = await visionSingleton.classify(imageSrc, (p) => {
        if (p.status === "downloading") {
          const pct = Math.round((p.loaded / p.total) * 100) || 0;
          setProgress(pct);
          setStatus(`Downloading weights: ${pct}%`);
        }
      });

      setStatus("Complete");

      if (Array.isArray(results) && results.length > 0) {
        return results
          .slice(0, 3)
          .map(r => `${r.label} (${Math.round(r.score * 100)}% confidence)`)
          .join(', ');
      }
      return "No clear classification found.";
    } catch (err) {
      setStatus(`Error: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { analyze, loading, status, progress };
}