import { memo, useCallback } from 'react';
import { useSelectedContact } from '../contexts/SelectedContactContext';
import type { Contact } from '../utils';

import ContactList from './ContactList';
import ImportContacts from './ImportContacts';
import ProfileArea from './ProfileArea';
import SearchBar from './SearchBar';

const ContactsPanel = memo(() => {
  const { setSelectedContact } = useSelectedContact();

  const onContactSelect = useCallback((contact: Contact) => {
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
