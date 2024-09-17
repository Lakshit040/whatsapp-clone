import { useCallback, useEffect, useState } from 'react';
import {
  loadContactsFromStorage,
  saveContactsToStorage,
  generateUniqueId,
  type Contact,
  LastMessageUpdateEvent,
} from '../utils';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(
    loadContactsFromStorage()
  );

  useEffect(() => {
    const handleLastMessageChange = (event: Event) => {
      const { contactId, lastMessage } = (event as LastMessageUpdateEvent)
        .detail;

      const allContacts = loadContactsFromStorage();
      const contactIdx = allContacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIdx > -1) {
        allContacts[contactIdx].lastMessage = lastMessage;
        saveContactsToStorage(allContacts);
        setContacts(allContacts);
      }
    };
    window.addEventListener('lastMessageUpdated', handleLastMessageChange);
    return () => {
      window.removeEventListener('lastMessageUpdated', handleLastMessageChange);
    };
  }, []);

  const addContact = useCallback((name: string) => {
    const newContact: Contact = {
      id: generateUniqueId(),
      name,
    };
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts, newContact];
      saveContactsToStorage(updatedContacts);
      return updatedContacts;
    });
  }, []);

  const deleteContact = useCallback((contactId: string) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter(
        (contact) => contact.id !== contactId
      );
      saveContactsToStorage(updatedContacts);
      return updatedContacts;
    });
  }, []);
  return {
    contacts,
    addContact,
    deleteContact,
  };
};

export default useContacts;
