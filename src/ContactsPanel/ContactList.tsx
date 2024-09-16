import { useCallback, memo, useEffect, useMemo } from 'react';
import { useContacts } from '../contexts/ContactsContext';
import { useMessages } from '../contexts/MessagesContext';

import Contact from './Contact';
import CreateEditModal from '../Modals/CreateEditModal';
import { FaPlus } from 'react-icons/fa';

const ContactList = memo(() => {
  const { contacts, addContact, deleteContact } = useContacts();
  const { messages, clearMessagesForContact } = useMessages();

  const lastMessages = useMemo(() => {
    return Object.fromEntries(
      Object.entries(messages).map(([contactId, messageArray]) => {
        const lastMessage = messageArray?.at(-1);
        return [contactId, lastMessage];
      })
    );
  }, [messages]);

  useEffect(() => {
    console.log('Rendered ContactList');
  });

  const handleAddNewContact = useCallback(
    (name: string, profileImg: string) => {
      addContact(name, profileImg);
    },
    [addContact]
  );

  const handleContactDelete = useCallback(
    (contactId: string) => {
      deleteContact(contactId);
      if (lastMessages[contactId]) clearMessagesForContact(contactId);
    },
    [lastMessages, deleteContact, clearMessagesForContact]
  );

  return (
    <div className='container mx-auto h-[calc(100vh-200px)] overflow-y-scroll relative'>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={handleContactDelete}
          lastMessage={lastMessages[contact.id]}
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
