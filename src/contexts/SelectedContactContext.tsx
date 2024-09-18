import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Contact } from '../redux/types';

interface SelectedContactContextProps {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
}

const SelectedContactContext = createContext<
  SelectedContactContextProps | undefined
>(undefined);

export const SelectedContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contextValue = useMemo(
    () => ({
      selectedContact,
      setSelectedContact,
    }),
    [selectedContact, setSelectedContact]
  );

  return (
    <SelectedContactContext.Provider value={contextValue}>
      {children}
    </SelectedContactContext.Provider>
  );
};

export const useSelectedContact = () => {
  const context = useContext(SelectedContactContext);
  if (!context) {
    throw new Error(
      'useSelectedContact must be used within a SelectedContactProvider'
    );
  }
  return context;
};
