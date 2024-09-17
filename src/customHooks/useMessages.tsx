import { useEffect, useState } from 'react';

import {
  saveMessagesIntoStorage,
  timeFormatter,
  generateUniqueId,
  type Message,
  loadMessagesFromStorage,
} from '../utils';

const useMessages = (contactId: string) => {
  const [messages, setMessages] = useState<Message[]>(
    loadMessagesFromStorage(contactId)
  );

  useEffect(() => {
    setMessages(loadMessagesFromStorage(contactId));
  }, [contactId]);

  const eventDispatcher = (contactId: string, lastMessage?: Message) => {
    const event = new CustomEvent('lastMessageUpdated', {
      detail: {
        contactId,
        lastMessage,
      },
    });
    window.dispatchEvent(event);
  };

  const addMessage = (message: string) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      contactId,
      message,
      timestamp: timeFormatter(),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      saveMessagesIntoStorage(contactId, updatedMessages);
      eventDispatcher(contactId, newMessage);
      return updatedMessages;
    });
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (message) => message.id !== messageId
      );
      saveMessagesIntoStorage(contactId, updatedMessages);
      if (prevMessages.at(-1)?.id === messageId) {
        eventDispatcher(contactId, updatedMessages.at(-1));
      }
      return updatedMessages;
    });
  };

  const editMessage = (messageId: string, newText: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const msgIndex = updatedMessages.findIndex(
        (message) => message.id === messageId
      );
      if (msgIndex > -1) {
        updatedMessages[msgIndex].message = newText;
        if (msgIndex === updatedMessages.length - 1) {
          eventDispatcher(contactId, updatedMessages[msgIndex]);
        }
      }
      saveMessagesIntoStorage(contactId, updatedMessages);
      return updatedMessages;
    });
  };

  return {
    messages,
    addMessage,
    deleteMessage,
    editMessage,
  };
};

export default useMessages;
