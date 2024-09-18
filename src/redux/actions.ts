// actions.ts
import {
  ContactActionType,
  MessageActionType,
  Contact,
  Message,
} from '../types';

// Contact Actions
export const addContact = (contact: Contact) => ({
  type: ContactActionType.AddContact,
  payload: contact,
});

export const deleteContact = (contactId: string) => ({
  type: ContactActionType.DeleteContact,
  payload: contactId,
});

export const updateLastMessage = (contactId: string, message: Message) => ({
  type: ContactActionType.UpdateLastMessage,
  payload: { contactId, message },
});

// Message Actions
export const addMessage = (contactId: string, message: Message) => ({
  type: MessageActionType.AddMessage,
  payload: { contactId, message },
});

export const editMessage = (
  contactId: string,
  messageId: string,
  newText: string
) => ({
  type: MessageActionType.EditMessage,
  payload: { contactId, messageId, newText },
});

export const deleteMessage = (contactId: string, messageId: string) => ({
  type: MessageActionType.DeleteMessage,
  payload: { contactId, messageId },
});
