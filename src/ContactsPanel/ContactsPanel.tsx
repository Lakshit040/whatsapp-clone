import { memo, useCallback } from 'react';
import useSelectedContact from '../customHooks/useSelectedContact';
import type { Contact } from '../utils';

import ContactList from './ContactList';
import ImportContacts from './ImportContacts';
import ProfileArea from './ProfileArea';
import SearchBar from './SearchBar';
import useContacts from '../customHooks/useContacts';

const ContactsPanel = memo(() => {
  const { selectContact } = useSelectedContact();
  const { contacts, addContact, deleteContact } = useContacts();

  const onContactSelect = useCallback((contact: Contact) => {
    selectContact(contact);
  }, []);

  return (
    <>
      <ProfileArea />
      <ImportContacts />
      <SearchBar contacts={contacts} onContactSelect={onContactSelect} />
      <ContactList
        contacts={contacts}
        addContact={addContact}
        deleteContact={deleteContact}
      />
    </>
  );
});

export default ContactsPanel;
