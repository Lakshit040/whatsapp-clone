import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Mode } from '../utils';

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.Spacious);

  const toggleMode = useCallback(() => {
    setMode((prevMode) =>
      prevMode === Mode.Compact ? Mode.Spacious : Mode.Compact
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode, toggleMode]
  );

  return (
    <ModeContext.Provider value={contextValue}>{children}</ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
