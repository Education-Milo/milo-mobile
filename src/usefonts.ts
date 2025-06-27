import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const fontMap = {
  'Fedora-One': require('../../assets/fonts/FedoraOne-Regular.ttf'),
};

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load fonts')
        );
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, error };
};