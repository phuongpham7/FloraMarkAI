import React, { useState } from 'react';
import Navigation from './components/Navigation';
import CameraCapture from './components/CameraCapture';
import ImageUploader from './components/ImageUploader';
import ModelLoader from './components/ModelLoader';
import AnalysisResult from './components/AnalysisResult';
import GearRecommendationCard from './components/GearRecommendationCard';
import { useLocalVision } from './hooks/useLocalVision';
import { checkOfflineHazards } from './lib/plantDatabase';

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [result, setResult] = useState("");
  const [hazard, setHazard] = useState(null);

  const { analyze, loading, status, progress } = useLocalVision();

  const handleRun = async (imgData) => {
    const targetImage = imgData || imageSrc;
    if (!targetImage) return;
    
    setResult("");
    setHazard(null);
    try {
      const textOutput = await analyze(targetImage);
      setResult(textOutput);
      setHazard(checkOfflineHazards(textOutput));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <Navigation />
      
      <div className="card">
        <label>Capture or Select Trail Photo:</label>
        
        <div className="button-row">
          <CameraCapture onImageCaptured={(img) => { setImageSrc(img); handleRun(img); }} />
          <ImageUploader onImageSelected={(img) => { setImageSrc(img); handleRun(img); }} />
        </div>

        {imageSrc && (
          <img src={imageSrc} alt="Preview" className="preview-img" />
        )}

        <button 
          onClick={() => handleRun(imageSrc)} 
          disabled={!imageSrc || loading} 
          className="action-btn"
        >
          {loading ? "Analyzing..." : "Re-Analyze Image"}
        </button>

        {loading && <ModelLoader progress={progress} status={status} />}
        
        {result && (
          <>
            <AnalysisResult 
              result={result} 
              hazard={hazard} 
              onHazardUpdate={(newHazard) => setHazard(newHazard)} 
            />
            <GearRecommendationCard hazardName={hazard ? hazard.name : "General Hiking"} />
          </>
        )}
      </div>
    </div>
  );
}