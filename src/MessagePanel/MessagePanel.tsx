import { memo } from 'react';
import useSelectedContact from '../customHooks/useSelectedContact';
import MessageAreaComponent from './MessageAreaComponent';

const MessagePanel = memo(() => {
  const { selectedContact, selectContact } = useSelectedContact();

  if (selectedContact === null) {
    return (
      <span className='h-screen flex items-center justify-center font-poppins lg:text-2xl'>
        Select a conversation to get started!
      </span>
    );
  }

  return (
    <MessageAreaComponent
      contactId={selectedContact.id}
      selectContact={selectContact}
      name={selectedContact.name}
    />
  );
});

export default MessagePanel;
