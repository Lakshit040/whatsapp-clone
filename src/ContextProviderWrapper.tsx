import { ReactNode } from 'react';
import { SelectedContactProvider } from './contexts/SelectedContactContext';
import { ModeProvider } from './contexts/ModeContext';

interface ContextProviderWrapperProps {
  children: ReactNode;
}

const ContextProviderWrapper = ({ children }: ContextProviderWrapperProps) => {
  return (
    <SelectedContactProvider>
      <ModeProvider>{children}</ModeProvider>
    </SelectedContactProvider>
  );
};

export default ContextProviderWrapper;
