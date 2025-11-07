import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardState = () => {
  const [isFieldFocused, setIsFieldFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFieldFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFieldFocused(false);
  }, []);

  const dismissKeyboard = useCallback(() => {
    setIsFieldFocused(false);
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsFieldFocused(false);
        Keyboard.dismiss();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isFieldFocused]);

  return {
    isFieldFocused,
    handleFocus,
    handleBlur,
    dismissKeyboard,
  };
};
