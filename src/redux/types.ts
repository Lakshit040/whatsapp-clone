// types.ts

export interface Contact {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  createdAt: string;
}

export interface ContactsState {
  byId: Record<string, Contact>;
  allIds: string[];
  lastMessages: Record<string, Message | undefined>;
}

export interface MessagesState {
  byContactId: Record<string, Message[]>;
}

export interface RootState {
  contacts: ContactsState;
  messages: MessagesState;
}

export const enum ContactActionType {
  AddContact,
  DeleteContact,
  UpdateLastMessage,
}

export const enum MessageActionType {
  AddMessage,
  EditMessage,
  DeleteMessage,
}

// Action Interfaces
interface AddContactAction {
  type: ContactActionType.AddContact;
  payload: Contact;
}

interface DeleteContactAction {
  type: ContactActionType.DeleteContact;
  payload: string;
}

interface UpdateLastMessageAction {
  type: ContactActionType.UpdateLastMessage;
  payload: { contactId: string; message: Message };
}

interface AddMessageAction {
  type: MessageActionType.AddMessage;
  payload: { contactId: string; message: Message };
}

interface EditMessageAction {
  type: MessageActionType.EditMessage;
  payload: { contactId: string; messageId: string; newText: string };
}

interface DeleteMessageAction {
  type: MessageActionType.DeleteMessage;
  payload: { contactId: string; messageId: string };
}

export type ContactsActionTypes =
  | AddContactAction
  | DeleteContactAction
  | UpdateLastMessageAction;

export type MessagesActionTypes =
  | AddMessageAction
  | EditMessageAction
  | DeleteMessageAction;

export type ActionTypes = ContactsActionTypes | MessagesActionTypes;
