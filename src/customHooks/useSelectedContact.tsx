import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Contact } from '../utils';

interface SelectedContactContextProps {
  selectedContact: Contact | null;
  selectContact: (contact: Contact | null) => void;
}

const SelectedContactContext = createContext<
  SelectedContactContextProps | undefined
>(undefined);

export const SelectedContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const selectContact = useCallback((contact: Contact | null) => {
    setSelectedContact(contact);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedContact,
      selectContact,
    }),
    [selectedContact]
  );

  return (
    <SelectedContactContext.Provider value={contextValue}>
      {children}
    </SelectedContactContext.Provider>
  );
};

const useSelectedContact = () => {
  const context = useContext(SelectedContactContext);
  if (!context) {
    throw new Error(
      'useSelectedContact must be used within a SelectedContactProvider'
    );
  }
  return context;
};

export default useSelectedContact;
