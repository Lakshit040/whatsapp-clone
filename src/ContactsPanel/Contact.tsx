import { memo, useCallback } from 'react';
import { useMode } from '../contexts/ModeContext';
import { useSelectedContact } from '../contexts/SelectedContactContext';

import { DeleteButton } from '../icons';

import { PROFILE_IMG, timeFormatter, truncateMessage } from '../utils';
import { Contact as ContactType, Message, Mode } from '../types';

interface ContactComponentProps {
  contact: ContactType;
  lastMessage?: Message;
  onDelete: (contactId: string) => void;
}

const Contact = memo(
  ({ contact, lastMessage, onDelete }: ContactComponentProps) => {
    const { mode } = useMode();
    const { selectedContact, setSelectedContact } = useSelectedContact();

    const handleContactClick = useCallback(() => {
      if (selectedContact?.id === contact.id) return;
      setSelectedContact(contact);
    }, [selectedContact, contact.id]);

    const handleContactDelete = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete(contact.id);
        if (selectedContact?.id === contact.id) setSelectedContact(null);
      },
      [selectedContact, onDelete]
    );

    return (
      <div
        data-testid='contact'
        className={`relative flex items-center py-4 px-4 border-b-[.5px] border-gray-600 cursor-pointer group ${
          selectedContact?.id === contact.id
            ? 'bg-contact-active border-[.5px] border-green-400 font-semibold'
            : ' bg-contact'
        }`}
        title={
          lastMessage?.text && lastMessage.text.length > 50
            ? lastMessage.text
            : contact.name
        }
        onClick={handleContactClick}
      >
        <div className='w-14 h-12 rounded-full overflow-hidden'>
          <img
            src={PROFILE_IMG}
            alt={contact.name}
            className='w-full h-full object-cover rounded-full'
          />
        </div>
        <div className='ml-4 flex flex-col justify-between w-full'>
          <span data-testid='contact-name' className='font-poppins'>
            {contact.name}
          </span>
          {mode === Mode.Spacious && lastMessage && (
            <div
              data-testid='spacious'
              className='flex justify-between items-center w-full'
            >
              <span data-testid='last-msg' className='text-xs text-gray-300'>
                {truncateMessage(lastMessage.text)}
              </span>
              <span className='text-xs text-gray-400'>
                {timeFormatter(lastMessage.createdAt)}
              </span>
            </div>
          )}

          <button
            data-testid='delete-contact'
            className='absolute right-4 top-6 hidden group-hover:block'
            onClick={handleContactDelete}
          >
            <DeleteButton
              className='w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110'
              title='Delete contact'
            />
          </button>
        </div>
      </div>
    );
  }
);

export default Contact;
