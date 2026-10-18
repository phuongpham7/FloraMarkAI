import { useState, useRef } from 'react';

export default function CameraCapture({ onImageCaptured }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start the device camera stream
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefers rear camera on phones
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Unable to access camera. Please check permissions.");
      setIsCameraActive(false);
    }
  };

  // Capture a still frame from the video stream
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      onImageCaptured(imageDataUrl);
      
      stopCamera();
    }
  };

  // Stop camera stream to free up hardware
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  return (
    <div className="camera-widget">
      {!isCameraActive ? (
        <button onClick={startCamera} className="camera-btn">
          📸 Open Live Camera
        </button>
      ) : (
        <div className="camera-stream-box">
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }} />
          <button onClick={capturePhoto} className="capture-btn">
            🟢 Snap Photo
          </button>
          <button onClick={stopCamera} className="cancel-btn" style={{ background: '#d32f2f' }}>
            Cancel
          </button>
        </div>
      )}
      {/* Hidden canvas used to process snapshot frame data */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}