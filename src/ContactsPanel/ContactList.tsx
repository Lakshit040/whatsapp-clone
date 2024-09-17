import { useCallback, memo } from 'react';

import { FaPlus } from '../icons';
import Modal from '../Modals/Modal';
import {
  type Contact as ContactType,
  ModalActionType,
  OnConfirm,
  onModalConfirm,
} from '../utils';

import Contact from './Contact';

interface ContactListProps {
  contacts: ContactType[];
  addContact: (name: string) => void;
  deleteContact: (contactId: string) => void;
}

const ContactList = memo(
  ({ contacts, addContact, deleteContact }: ContactListProps) => {
    const handleAddNewContact: OnConfirm = useCallback(
      (event: onModalConfirm) => {
        const {
          type,
          state: { entry },
        } = event;
        if (type === ModalActionType.AddContact && entry) {
          addContact(entry);
        }
      },
      [addContact]
    );

    const handleContactDelete = useCallback(
      (contactId: string) => {
        deleteContact(contactId);
      },
      [deleteContact]
    );

    return (
      <div className='container mx-auto h-[calc(100vh-200px)] overflow-y-scroll relative'>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={handleContactDelete}
            lastMessage={contact.lastMessage}
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
  }
);

export default ContactList;
