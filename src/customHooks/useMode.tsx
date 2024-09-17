import { useCallback, useState } from 'react';
import { Mode } from '../utils';

const useMode = () => {
  const [mode, setMode] = useState<Mode>(Mode.Spacious);

  const toggleMode = useCallback(() => {
    setMode((prevMode) =>
      prevMode === Mode.Compact ? Mode.Spacious : Mode.Compact
    );
  }, []);

  return {
    mode,
    toggleMode,
  };
};

export default useMode;
