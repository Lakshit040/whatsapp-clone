import { memo, useCallback, useEffect } from 'react';

import { useMode } from '../contexts/ModeContext';
import { type ContactProps } from '../contexts/ContactsContext';
import { type Message } from '../contexts/MessagesContext';

import { MdDelete } from 'react-icons/md';

import _ from 'lodash';
import { format } from 'date-fns';
import { Mode } from '../constants';

interface ContactComponentProps {
  isSelected: boolean;
  contact: ContactProps;
  onDelete: (contactId: string) => void;
  onClick: (contact: ContactProps) => void;
  lastMessage?: Message;
}

const Contact = memo(
  ({
    isSelected,
    contact,
    onDelete,
    onClick,
    lastMessage,
  }: ContactComponentProps) => {
    const { mode } = useMode();

    const handleContactDelete = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete(contact.id);
      },
      [onDelete, contact.id]
    );

    useEffect(() => {
      console.log('Rendered Contact Component with name, ', contact.name);
    });

    const handleContactClick = useCallback(() => {
      onClick(contact);
    }, [contact]);

    return (
      <div
        className={`relative flex items-center py-4 px-4 border-b-[.5px] border-gray-600 cursor-pointer group ${
          isSelected
            ? 'bg-contact-active border-[.5px] border-green-400 font-semibold'
            : ' bg-contact'
        }`}
        title={lastMessage?.message ?? contact.name}
        onClick={handleContactClick}
      >
        <div className='w-14 h-12 rounded-full overflow-hidden'>
          <img
            src={contact.profileImg}
            alt={contact.name}
            className='w-full h-full object-cover rounded-full'
          />
        </div>
        <div className='ml-4 flex flex-col justify-between w-full'>
          <span className='font-poppins'>{contact.name}</span>
          {mode === Mode.Spacious && lastMessage && (
            <div className='flex justify-between items-center w-full'>
              <span className='text-xs text-gray-300 '>
                {_.truncate(lastMessage.message, {
                  length: 50,
                  separator: /,?\s+/,
                  omission: '...',
                })}
              </span>
              <span className='text-xs text-gray-400'>
                {format(new Date(lastMessage.timestamp), 'HH:mm')}
              </span>
            </div>
          )}

          <button
            className='absolute right-4 top-6 hidden group-hover:block'
            onClick={handleContactDelete}
          >
            <MdDelete
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
