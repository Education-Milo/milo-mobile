import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const fontMap = {
  'FredokaOne-Regular': require('@assets/fonts/FredokaOne-Regular.ttf'),
  'Qualy-neue-regular': require('@assets/fonts/qualy-neue-regular.ttf'),
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