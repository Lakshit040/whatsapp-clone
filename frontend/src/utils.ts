import { format } from 'date-fns';
import truncate from 'lodash.truncate';
import { v4 } from 'uuid';
import { Format } from './types';

export const PROFILE_IMG =
  'https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE';

export const LOCAL_STORAGE_CONTACT_KEY = 'contacts';

export const LOCAL_STORAGE_MESSAGE_KEY = 'messages';

export const timeFormatter = (timeStr?: string) => {
  if (timeStr) return format(new Date(timeStr), Format.Time);
  return format(new Date(), Format.DateTime);
};

export const generateUniqueId = () => {
  return v4();
};

export const truncateMessage = (message: string) => {
  return truncate(message, {
    length: 50,
    separator: /,?\s+/,
    omission: '...',
  });
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};
