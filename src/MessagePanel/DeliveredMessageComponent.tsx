import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useMessages } from '../contexts/MessagesContext';

import UserMessage from './UserMessage';
import { ModalActionType, OnConfirm, onModalConfirm } from '../utils';

interface DeliveredMessageComponentProps {
  contactId: string;
}

const DeliveredMessageComponent = memo(
  ({ contactId }: DeliveredMessageComponentProps) => {
    const { messages, editMessage, deleteMessage } = useMessages();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const contactMessages = useMemo(
      () => messages[contactId] ?? [],
      [messages, contactId]
    );

    const handleMessageDelete: OnConfirm = useCallback(
      (event: onModalConfirm) => {
        const {
          type,
          state: { contactId, messageId },
        } = event;
        if (type === ModalActionType.DeleteMessage && contactId && messageId)
          deleteMessage(contactId, messageId);
      },
      [deleteMessage]
    );

    const handleMessageEdit: OnConfirm = useCallback(
      (event: onModalConfirm) => {
        const {
          type,
          state: { contactId, messageId, entry },
        } = event;
        if (
          type === ModalActionType.EditMessage &&
          contactId &&
          messageId &&
          entry
        ) {
          editMessage(contactId, messageId, entry);
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
          {contactMessages.length === 0 && (
            <div className='flex justify-center items-center w-full h-full text-xl font-poppins'>
              No Messages Yet
            </div>
          )}
          {contactMessages.map((message) => (
            <UserMessage
              key={message.id}
              contactId={message.contactId}
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
  }
);

export default DeliveredMessageComponent;
