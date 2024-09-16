import { useCallback, useState, memo, useEffect } from 'react';

import { IoMdSend } from 'react-icons/io';
import { useMessages } from '../contexts/MessagesContext';

interface AddMessageComponentProps {
  contactId: string;
}

const AddMessageComponent = memo(({ contactId }: AddMessageComponentProps) => {
  const { addMessage } = useMessages();
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Rendered AddMessasgeComponent');
  });

  const handleAddMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim().length === 0) return;
      addMessage(contactId, message.trim());
      setMessage('');
    },
    [message, contactId, addMessage]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleAddMessage(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [handleAddMessage]
  );

  const handleMessageChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  return (
    <div className='w-full p-5 border-t-[0.5px] border-gray-600'>
      <form
        onSubmit={handleAddMessage}
        className='relative flex space-x-2 w-full'
      >
        <textarea
          className='flex-1 p-3 border border-gray-600 rounded-lg focus:outline-none resize-none placeholder:text-gray-500 font-poppins text-gray-300'
          placeholder='Type a message here...'
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleMessageChange}
        />
        <button
          type='submit'
          className='absolute right-3.5 top-3.5 bg-blue-500 text-gray-300 hover:text-white p-3 rounded-full flex items-center justify-center gap-2 font-poppins'
          title='Send message'
        >
          Send
          <IoMdSend className='w-6 h-6' />
        </button>
      </form>
    </div>
  );
});

export default AddMessageComponent;
