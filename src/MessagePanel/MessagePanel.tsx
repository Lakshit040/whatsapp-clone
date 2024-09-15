import { memo, useCallback, useEffect } from 'react';

import MessagePanelHeading from './MessagePanelHeading';
import DeliveredMessageComponent from './DeliveredMessageComponent';
import AddMessageComponent from './AddMessageComponent';
import { useMessages } from '../contexts/MessagesContext';

const MessagePanel = memo(() => {
  const { selectedContact, setSelectedContact } = useMessages();

  useEffect(() => {
    console.log('Renderered MessagePanel');
  });

  const handleChatClose = useCallback(() => {
    setSelectedContact(null);
  }, [setSelectedContact]);

  if (selectedContact === null) {
    return (
      <span className='h-screen flex items-center justify-center font-poppins lg:text-2xl'>
        Select a conversation to get started!
      </span>
    );
  }

  return (
    <div className='container mx-auto relative h-screen bg-custom-bg bg-center bg-repeat flex flex-col'>
      <MessagePanelHeading
        name={selectedContact.name}
        profileImg={selectedContact.profileImg}
        onChatClose={handleChatClose}
        className='sticky'
      />
      <div className='flex-1 overflow-y-auto'>
        <DeliveredMessageComponent contactId={selectedContact.id} />
      </div>
      <div className='w-full sticky bottom-0'>
        <AddMessageComponent contactId={selectedContact.id} />
      </div>
    </div>
  );
});

export default MessagePanel;
