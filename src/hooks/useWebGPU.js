import { useState, useEffect } from 'react';

export function useWebGPU() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (navigator.gpu) {
      navigator.gpu.requestAdapter().then(adapter => {
        setIsSupported(!!adapter);
      });
    }
  }, []);

  return isSupported;
}