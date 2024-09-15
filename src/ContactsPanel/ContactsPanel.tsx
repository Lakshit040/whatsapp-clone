import { memo, useCallback } from 'react';

import { type ContactProps } from '../contexts/ContactsContext';

import ContactList from './ContactList';
import ImportContacts from './ImportContacts';
import ProfileArea from './ProfileArea';
import SearchBar from './SearchBar';
import { useMessages } from '../contexts/MessagesContext';

const ContactsPanel = memo(() => {
  const { setSelectedContact } = useMessages();

  const onContactSelect = useCallback((contact: ContactProps) => {
    setSelectedContact(contact);
  }, []);

  return (
    <>
      <ProfileArea />
      <ImportContacts />
      <SearchBar onContactSelect={onContactSelect} />
      <ContactList />
    </>
  );
});

export default ContactsPanel;
