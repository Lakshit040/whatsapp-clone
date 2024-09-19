import { useCallback, memo } from 'react';

import Contact from './Contact';
import { FaPlus } from '../icons';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, addContact } from '../redux/reducer';
import { RootState } from './../types';
import { generateUniqueId } from '../utils';
import selectContacts from '../redux/selector';
import CreateEditDialog from '../Modals/CreateEditDialog';

const ContactList = memo(() => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const lastMessages = useSelector(
    (state: RootState) => state.contacts.lastMessages
  );

  const handleAddNewContact = useCallback((name: string) => {
    dispatch(
      addContact({
        id: generateUniqueId(),
        name,
      })
    );
  }, []);

  const handleContactDelete = useCallback((contactId: string) => {
    dispatch(deleteContact(contactId));
  }, []);

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
        <CreateEditDialog onConfirm={handleAddNewContact}>
          <FaPlus
            className='w-6 h-6 text-white m-4'
            title='Create New Contact'
          />
        </CreateEditDialog>
      </div>
    </div>
  );
});

export default ContactList;
