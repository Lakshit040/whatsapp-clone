import { format } from 'date-fns';
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  createContext,
  ReactNode,
} from 'react';

import { v4 as getId } from 'uuid';

export interface Message {
  id: string;
  contactId: string;
  message: string;
  timestamp: string;
}

interface MessageContextProps {
  messages: Record<string, Message[]>;
  addMessage: (contactId: string, message: string) => void;
  deleteMessage: (contactId: string, messageId: string) => void;
  editMessage: (
    contactId: string,
    messageId: string,
    newMessage: string
  ) => void;
  clearMessagesForContact: (contactId: string) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);
const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
const LOCAL_STORAGE_MESSAGE_KEY = 'messages';
const loadMessagesFromStorage = (): Record<string, Message[]> => {
  const storedMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY);
  return storedMessages ? JSON.parse(storedMessages) : {};
};

const saveMessagesIntoStorage = (messages: Record<string, Message[]>): void => {
  localStorage.setItem(LOCAL_STORAGE_MESSAGE_KEY, JSON.stringify(messages));
};

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    loadMessagesFromStorage()
  );

  useEffect(() => {
    saveMessagesIntoStorage(messages);
  }, [messages]);

  const addMessage = useCallback((contactId: string, message: string) => {
    const newMessage: Message = {
      id: getId(),
      contactId,
      message,
      timestamp: format(new Date(), DATE_TIME_FORMAT),
    };
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      if (!updatedMessages[contactId]) {
        updatedMessages[contactId] = [];
      }
      updatedMessages[contactId].push(newMessage);
      return updatedMessages;
    });
  }, []);

  const deleteMessage = useCallback((contactId: string, messageId: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      updatedMessages[contactId] = updatedMessages[contactId].filter(
        (message) => message.id !== messageId
      );
      return updatedMessages;
    });
  }, []);

  const editMessage = useCallback(
    (contactId: string, messageId: string, newText: string) => {
      setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        const msgIndex = updatedMessages[contactId].findIndex(
          (message) => message.id === messageId
        );
        if (msgIndex > -1) {
          updatedMessages[contactId][msgIndex].message = newText;
        }
        return updatedMessages;
      });
    },
    []
  );

  const clearMessagesForContact = useCallback((contactId: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      delete updatedMessages[contactId];
      return updatedMessages;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      messages,
      addMessage,
      deleteMessage,
      editMessage,
      clearMessagesForContact,
    }),
    [messages, addMessage, deleteMessage, editMessage, clearMessagesForContact]
  );

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageContextProvider');
  }
  return context;
};

export const useMesssagesForContact = (contactId: string) => {
  const { messages } = useMessages();

  return useMemo(() => messages[contactId], [messages, contactId]);
};
