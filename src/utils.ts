import { format } from 'date-fns';
import _ from 'lodash';
import { v4 } from 'uuid';

const enum Format {
  DateTime = 'yyyy-MM-dd HH:mm',
  Time = 'HH:mm',
}

export const PROFILE_IMG =
  'https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE';

export const enum Mode {
  Compact,
  Spacious,
}

export const enum ModalActionType {
  AddContact,
  DeleteContact,
  EditMessage,
  DeleteMessage,
}

export interface ModalActionProps {
  contactId?: string;
  messageId?: string;
  entry?: string;
}
export type onModalConfirm = {
  type: ModalActionType;
  state: ModalActionProps;
};

export type OnConfirm = (event: onModalConfirm ) => void;

export type Message = {
  id: string;
  contactId: string;
  message: string;
  timestamp: string;
};

export type Contact = {
  id: string;
  name: string;
  profileImg: string;
};

export const LOCAL_STORAGE_CONTACT_KEY = 'contacts';

export const LOCAL_STORAGE_MESSAGE_KEY = 'messages';

export const saveContactsToStorage = (contacts: Contact[]) => {
  localStorage.setItem(LOCAL_STORAGE_CONTACT_KEY, JSON.stringify(contacts));
};

export const loadContactsFromStorage = (): Contact[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACT_KEY) ?? '[]');
};

export const loadMessagesFromStorage = (): Record<string, Message[]> => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_MESSAGE_KEY) ?? '[]');
};

export const saveMessagesIntoStorage = (
  messages: Record<string, Message[]>
): void => {
  localStorage.setItem(LOCAL_STORAGE_MESSAGE_KEY, JSON.stringify(messages));
};

export const timeFormatter = (timeStr?: string) => {
  if (timeStr) return format(new Date(timeStr), Format.Time);
  return format(new Date(), Format.DateTime);
};

export const generateUniqueId = () => {
  return v4();
};

export const truncateMessage = (message: string) => {
  return _.truncate(message, {
    length: 50,
    separator: /,?\s+/,
    omission: '...',
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  return _.debounce(func, wait);
};

export const headingGenerator = (action: ModalActionType) => {
  switch (action) {
    case ModalActionType.AddContact:
      return 'Add New Contact?';
    case ModalActionType.DeleteContact:
      return 'Are you sure?';
    case ModalActionType.DeleteMessage:
      return 'Are you sure?';
    case ModalActionType.EditMessage:
      return 'Edit Your Message?';
    default:
      return '';
  }
};

export const labelGenerator = (action: ModalActionType) => {
  switch (action) {
    case ModalActionType.AddContact:
      return 'Name';
    case ModalActionType.EditMessage:
      return 'Message';
    default:
      return undefined;
  }
};
