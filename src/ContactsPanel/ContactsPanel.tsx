import { memo, useCallback } from 'react';
import { useSelectedContact } from '../contexts/SelectedContactContext';
import { ContactProps } from '../contexts/ContactsContext';

import ContactList from './ContactList';
import ImportContacts from './ImportContacts';
import ProfileArea from './ProfileArea';
import SearchBar from './SearchBar';

const ContactsPanel = memo(() => {
  const { setSelectedContact } = useSelectedContact();

  const onContactSelect = useCallback(
    (contact: ContactProps) => {
      setSelectedContact(contact);
    },
    [setSelectedContact]
  );

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
