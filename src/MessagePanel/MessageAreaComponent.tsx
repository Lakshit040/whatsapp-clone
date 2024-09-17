import { useCallback } from 'react';
import useMessages from '../customHooks/useMessages';
import { Contact } from '../utils';
import MessagePanelHeading from './MessagePanelHeading';
import DeliveredMessageComponent from './DeliveredMessageComponent';
import AddMessageComponent from './AddMessageComponent';

interface MessageAreaComponentProps {
  contactId: string;
  name: string;
  selectContact: (contact: Contact | null) => void;
}

const MessageAreaComponent = ({
  contactId,
  name,
  selectContact,
}: MessageAreaComponentProps) => {
  const { messages, addMessage, editMessage, deleteMessage } =
    useMessages(contactId);

  const handleChatClose = useCallback(() => {
    selectContact(null);
  }, [selectContact]);

  return (
    <div className='container mx-auto relative h-screen bg-custom-bg bg-center bg-repeat flex flex-col'>
      <MessagePanelHeading name={name} onChatClose={handleChatClose} />
      <div className='flex-1 overflow-y-auto'>
        <DeliveredMessageComponent
          contactId={contactId}
          messages={messages}
          editMessage={editMessage}
          deleteMessage={deleteMessage}
        />
      </div>
      <div className='w-full sticky bottom-0'>
        <AddMessageComponent addMessage={addMessage} />
      </div>
    </div>
  );
};

export default MessageAreaComponent;
