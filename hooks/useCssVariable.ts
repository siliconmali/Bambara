'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider/useTheme';

const useCssVariable = (variableName: string) => {
  const { theme } = useTheme();
  const [variableValue, setVariableValue] = useState<string>('');

  useEffect(() => {
    const getVariableValue = () => {
      const root = document.documentElement;
      const value = getComputedStyle(root).getPropertyValue(variableName).trim();
      setVariableValue(value);
    };

    getVariableValue();

    // Optional: Add event listener for dynamic updates (if needed)
    window.addEventListener('resize', getVariableValue); // Example event

    return () => {
      window.removeEventListener('resize', getVariableValue); // Cleanup
    };
  }, [variableName, theme]); // Re-run when theme or variable name changes

  return variableValue;
};

export default useCssVariable;