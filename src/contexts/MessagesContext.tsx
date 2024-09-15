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

import { LOCAL_STORAGE_MESSAGE_KEY, DATE_TIME_FORMAT } from '../constants';

import { v4 as getId } from 'uuid';
import { ContactProps } from './ContactsContext';

export interface Message {
  id: string;
  contactId: string;
  message: string;
  timestamp: string;
}

interface MessageContextProps {
  selectedContact: ContactProps | null;
  setSelectedContact: (contact: ContactProps | null) => void;
  messages: Message[];
  lastMessage: Record<string, Message | undefined>;
  addMessage: (contactId: string, message: string) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newMessage: string) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

const loadMessagesFromStorage = (contactId?: string): Message[] => {
  if (contactId) {
    const allMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY);
    if (allMessages) {
      return JSON.parse(allMessages)[contactId] ?? [];
    }
  }
  return [];
};

const loadLastMessageForContacts = (): Record<string, Message | undefined> => {
  const allMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY);
  if (allMessages) {
    const messagesByContact = JSON.parse(allMessages);
    const lastMessages: Record<string, Message | undefined> = {};

    Object.keys(messagesByContact).forEach((contactId) => {
      const messages: Message[] = messagesByContact[contactId];
      if (messages.length > 0) {
        lastMessages[contactId] = messages[messages.length - 1];
      }
    });

    return lastMessages;
  }
  return {};
};

const saveMessagesIntoStorage = (
  contactMessages: Message[],
  contactId?: string
): void => {
  if (!contactId) return;
  const allMessages = localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY);
  let storedMessages: Record<string, Message[]> = {};
  if (allMessages) {
    storedMessages = JSON.parse(allMessages);
  }
  storedMessages[contactId] = contactMessages;
  localStorage.setItem(
    LOCAL_STORAGE_MESSAGE_KEY,
    JSON.stringify(storedMessages)
  );
};

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedContact, setSelectedContact] = useState<ContactProps | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<
    Record<string, Message | undefined>
  >(loadLastMessageForContacts);

  useEffect(() => {
    if (selectedContact) {
      const contactMessages = loadMessagesFromStorage(selectedContact.id);
      setMessages(contactMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) saveMessagesIntoStorage(messages, selectedContact.id);
  }, [messages]);

  const addMessage = useCallback((contactId: string, message: string) => {
    const newMessage: Message = {
      id: getId(),
      contactId,
      message,
      timestamp: format(new Date(), DATE_TIME_FORMAT),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLastMessage((prev) => ({
      ...prev,
      [contactId]: newMessage,
    }));
  }, []);

  const deleteMessage = useCallback(
    (messageId: string) => {
      if (
        selectedContact &&
        lastMessage[selectedContact.id]?.id === messageId
      ) {
        if (messages.length === 1) {
          setLastMessage((prev) => {
            const updated = { ...prev };
            updated[selectedContact.id] = undefined;
            return updated;
          });
        } else if (messages.length >= 2) {
          const secondLastMessage = messages.at(-2) as Message;
          setLastMessage((prev) => ({
            ...prev,
            [selectedContact.id]: secondLastMessage,
          }));
        }
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    },
    [messages, selectedContact, lastMessage]
  );

  const editMessage = useCallback(
    (messageId: string, newText: string) => {
      const updatedMessages = messages.map((msg) =>
        msg.id === messageId ? { ...msg, message: newText } : msg
      );
      setMessages(updatedMessages);

      if (
        selectedContact &&
        lastMessage[selectedContact.id]?.id === messageId
      ) {
        setLastMessage((prev) => ({
          ...prev,
          [selectedContact.id]: {
            ...(prev[selectedContact.id] as Message),
            message: newText,
          },
        }));
      }
    },
    [messages, selectedContact, lastMessage]
  );

  const contextValue = useMemo(
    () => ({
      selectedContact,
      setSelectedContact,
      messages,
      lastMessage,
      addMessage,
      deleteMessage,
      editMessage,
    }),
    [
      selectedContact,
      setSelectedContact,
      messages,
      lastMessage,
      addMessage,
      deleteMessage,
      editMessage,
    ]
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
