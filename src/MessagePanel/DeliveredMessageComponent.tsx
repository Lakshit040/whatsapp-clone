import { useCallback, useEffect, useRef } from 'react';

import UserMessage from './UserMessage';
import { Message, ModalActionType, OnConfirm, onModalConfirm } from '../utils';

interface DeliveredMessageComponentProps {
  messages: Message[];
  editMessage: (messageId: string, newText: string) => void;
  deleteMessage: (messageId: string) => void;
  contactId: string;
}

const DeliveredMessageComponent = ({
  contactId,
  messages,
  editMessage,
  deleteMessage,
}: DeliveredMessageComponentProps) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleMessageDelete: OnConfirm = useCallback(
    (event: onModalConfirm) => {
      const {
        type,
        state: { messageId },
      } = event;
      if (type === ModalActionType.DeleteMessage && messageId)
        deleteMessage(messageId);
    },
    [deleteMessage]
  );

  const handleMessageEdit: OnConfirm = useCallback(
    (event: onModalConfirm) => {
      const {
        type,
        state: { messageId, entry },
      } = event;
      if (type === ModalActionType.EditMessage && messageId && entry) {
        editMessage(messageId, entry);
      }
    },
    [editMessage]
  );

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='container mx-auto h-full'>
      <div className='h-full overflow-y-auto p-4' ref={messageContainerRef}>
        {messages.length === 0 && (
          <div className='flex justify-center items-center w-full h-full text-xl font-poppins'>
            No Messages Yet
          </div>
        )}
        {messages.map((message) => (
          <UserMessage
            key={message.id}
            contactId={contactId}
            messageId={message.id}
            text={message.message}
            timestamp={message.timestamp}
            onMessageDelete={handleMessageDelete}
            onMessageEdit={handleMessageEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveredMessageComponent;
