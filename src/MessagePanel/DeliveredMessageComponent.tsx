import { memo, useEffect, useRef } from 'react';
import { useMessages } from '../contexts/MessagesContext';

import UserMessage from './UserMessage';

interface DeliveredMessageComponentProps {
  contactId: string;
}

const DeliveredMessageComponent = memo(
  ({ contactId }: DeliveredMessageComponentProps) => {
    const { messages, editMessage, deleteMessage } = useMessages();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      console.log('Rendered DeliveredMessageComponent');
    });

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
              onMessageDelete={deleteMessage}
              onMessageEdit={editMessage}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default DeliveredMessageComponent;
