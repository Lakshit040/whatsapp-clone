import { memo, useCallback, useRef } from 'react';

import UserMessage from './UserMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import {
  deleteMessage,
  editMessage,
  updateLastMessage,
} from '../redux/reducer';
import { selectMessagesForContact } from '../redux/selector';

interface DeliveredMessageComponentProps {
  contactId: string;
}

const DeliveredMessageComponent = memo(
  ({ contactId }: DeliveredMessageComponentProps) => {
    const dispatch = useDispatch();

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const hasMounted = useRef<boolean>(false);

    const messages = useSelector((state: RootState) =>
      selectMessagesForContact(state, contactId)
    );
    const previousMessageCountRef = useRef<number>(messages.length);

    const scrollToBottom = useCallback(() => {
      const container = messageContainerRef.current;
      if (container) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }, []);

    const scrollToBottomIfNeeded = useCallback(() => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        requestAnimationFrame(scrollToBottom);
      } else if (messages.length > previousMessageCountRef.current) {
        requestAnimationFrame(scrollToBottom);
      }
      previousMessageCountRef.current = messages.length;
    }, [messages.length, scrollToBottom]);

    const onMessageDelete = useCallback(
      (messageId: string) => {
        const lastMessageId = messages.at(-1)?.id;
        if (lastMessageId && lastMessageId === messageId) {
          dispatch(
            updateLastMessage({
              contactId,
              message: messages.length >= 2 ? messages.at(-2) : undefined,
            })
          );
        }
        dispatch(deleteMessage({ contactId, messageId }));
      },
      [messages]
    );

    const onMessageEdit = useCallback(
      (messageId: string, newText: string) => {
        const prevLastMsg = messages.at(-1);
        if (prevLastMsg && prevLastMsg.id === messageId) {
          dispatch(
            updateLastMessage({
              contactId,
              message: {
                id: prevLastMsg.id,
                createdAt: prevLastMsg.createdAt,
                text: newText,
              },
            })
          );
        }
        dispatch(editMessage({ contactId, messageId, newText }));
      },
      [messages]
    );

    scrollToBottomIfNeeded();

    return (
      <div className='container mx-auto h-full'>
        <div className='h-full overflow-y-auto p-4' ref={messageContainerRef}>
          {messages ? (
            messages.map((message) => (
              <UserMessage
                key={message.id}
                messageId={message.id}
                text={message.text}
                createdAt={message.createdAt}
                onMessageDelete={onMessageDelete}
                onMessageEdit={onMessageEdit}
              />
            ))
          ) : (
            <div className='flex justify-center items-center w-full h-full text-xl font-poppins'>
              No Messages Yet
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default DeliveredMessageComponent;
