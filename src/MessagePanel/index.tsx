import { memo, useCallback } from 'react';
import { useSelectedContact } from '../contexts/SelectedContactContext';

import MessagePanelHeading from './MessagePanelHeading';
import DeliveredMessageComponent from './DeliveredMessageComponent';
import AddMessageComponent from './AddMessageComponent';

const MessagePanel = memo(() => {
  const { selectedContact, setSelectedContact } = useSelectedContact();

  const handleChatClose = useCallback(() => {
    setSelectedContact(null);
  }, []);

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
        onChatClose={handleChatClose}

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
