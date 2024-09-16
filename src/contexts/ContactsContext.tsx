import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  loadContactsFromStorage,
  saveContactsToStorage,
  generateUniqueId,
  type Contact,
} from '../utils';

interface ContactContextProps {
  contacts: Contact[];
  addContact: (name: string, profileImg: string) => void;
  deleteContact: (contactId: string) => void;
}

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>(
    loadContactsFromStorage()
  );

  useEffect(() => {
    saveContactsToStorage(contacts);
  }, [contacts]);

  const addContact = useCallback((name: string, profileImg: string) => {
    const newContact: Contact = {
      id: generateUniqueId(),
      name,
      profileImg,
    };
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  }, []);

  const deleteContact = useCallback((contactId: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      contacts,
      addContact,
      deleteContact,
    }),
    [contacts, addContact, deleteContact]
  );

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
