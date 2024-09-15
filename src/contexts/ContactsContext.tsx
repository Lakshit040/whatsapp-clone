import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as getId } from 'uuid';
import {
  LOCAL_STORAGE_CONTACT_KEY,
  LOCAL_STORAGE_MESSAGE_KEY,
} from '../constants';

export interface ContactProps {
  id: string;
  name: string;
  profileImg: string;
}

interface ContactContextProps {
  contacts: ContactProps[];
  addNewContact: (name: string, profileImg: string) => void;
  deleteContact: (contactId: string) => void;
}

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

const saveContactsToStorage = (contacts: ContactProps[]) => {
  localStorage.setItem(LOCAL_STORAGE_CONTACT_KEY, JSON.stringify(contacts));
};

const loadContactsFromStorage = (): ContactProps[] => {
  const contacts = localStorage.getItem(LOCAL_STORAGE_CONTACT_KEY);
  return contacts ? JSON.parse(contacts) : [];
};

const deleteMessageForContact = (contactId: string) => {
  const allMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY);
  if (allMessages) {
    const storedMessages = JSON.parse(allMessages);
    delete storedMessages[contactId];
    localStorage.setItem(
      LOCAL_STORAGE_MESSAGE_KEY,
      JSON.stringify(storedMessages)
    );
  }
};

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<ContactProps[]>(
    loadContactsFromStorage()
  );

  useEffect(() => {
    saveContactsToStorage(contacts);
  }, [contacts]);

  const addNewContact = useCallback((name: string, profileImg: string) => {
    const newContact: ContactProps = {
      id: getId(),
      name,
      profileImg,
    };
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  }, []);

  const deleteContact = useCallback(
    (contactId: string) => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
      deleteMessageForContact(contactId);
    },
    [deleteMessageForContact]
  );

  const contextValue = useMemo(
    () => ({
      contacts,
      addNewContact,
      deleteContact,
    }),
    [contacts, addNewContact, deleteContact]
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
