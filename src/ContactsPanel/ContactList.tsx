import { useCallback, memo, useEffect } from 'react';
import { ContactProps, useContacts } from '../contexts/ContactsContext';

import Contact from './Contact';
import CreateEditModal from '../Modals/CreateEditModal';
import { FaPlus } from 'react-icons/fa';
import { useMessages } from '../contexts/MessagesContext';

const ContactList = memo(() => {
  const { contacts, addNewContact, deleteContact } = useContacts();
  const { selectedContact, setSelectedContact, lastMessage } = useMessages();

  useEffect(() => {
    console.log('Rendered ContactList');
  });

  const handleAddNewContact = useCallback(
    (name: string, profileImg: string) => {
      addNewContact(name, profileImg);
    },
    [addNewContact]
  );

  const handleContactDelete = useCallback(
    (contactId: string) => {
      deleteContact(contactId);
      if (selectedContact?.id === contactId) setSelectedContact(null);
    },
    [deleteContact, selectedContact]
  );

  const handleContactSelect = useCallback((contact: ContactProps) => {
    if (selectedContact?.id === contact.id) return;
    setSelectedContact(contact);
  }, []);

  return (
    <div className='container mx-auto h-[calc(100vh-200px)] overflow-y-scroll relative'>
      {contacts.map((contact) => (
        <Contact
          isSelected={selectedContact?.id === contact.id}
          key={contact.id}
          contact={contact}
          onDelete={handleContactDelete}
          onClick={handleContactSelect}
          lastMessage={lastMessage[contact.id]}
        />
      ))}
      <div className='absolute bottom-8 left-4'>
        <CreateEditModal onContactSave={handleAddNewContact}>
          <FaPlus
            className='w-6 h-6 text-white m-4'
            title='Create New Contact'
          />
        </CreateEditModal>
      </div>
    </div>
  );
});

export default ContactList;
