import { useCallback, memo, useMemo } from 'react';
import { useContacts } from '../contexts/ContactsContext';
import { useMessages } from '../contexts/MessagesContext';

import Contact from './Contact';

import { FaPlus } from '../icons';
import Modal from '../Modals/Modal';
import {
  ModalActionType,
  OnConfirm,
  onModalConfirm,
  PROFILE_IMG,
} from '../utils';

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

  const handleAddNewContact: OnConfirm = useCallback(
    (event: onModalConfirm) => {
      const {
        type,
        state: { entry },
      } = event;
      if (type === ModalActionType.AddContact && entry) {
        addContact(entry, PROFILE_IMG);
      }
    },
    []
  );

  const handleContactDelete = useCallback(
    (contactId: string) => {
      deleteContact(contactId);
      if (lastMessages[contactId]) clearMessagesForContact(contactId);
    },
    [lastMessages]
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
      <div className='fixed bottom-4 left-4 z-10'>
        <Modal
          actionType={ModalActionType.AddContact}
          onConfirm={handleAddNewContact}
        >
          <FaPlus
            className='w-6 h-6 text-white m-4'
            title='Create New Contact'
          />
        </Modal>
      </div>
    </div>
  );
});

export default ContactList;
