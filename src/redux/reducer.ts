// reducers.ts
import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, Message, ContactsState, MessagesState } from './types';

// Contacts Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    byId: {},
    allIds: [],
    lastMessages: {},
  } as ContactsState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      const contact = action.payload;
      state.byId[contact.id] = contact;
      state.allIds.push(contact.id);
    },
    deleteContact(state, action: PayloadAction<string>) {
      const contactId = action.payload;
      delete state.byId[contactId];
      state.allIds = state.allIds.filter((id) => id !== contactId);
      delete state.lastMessages[contactId];
    },
    updateLastMessage(
      state,
      action: PayloadAction<{ contactId: string; message?: Message }>
    ) {
      const { contactId, message } = action.payload;
      state.lastMessages[contactId] = message;
    },
  },
});

// Messages Slice
const messagesSlice = createSlice({
  name: 'messages',
  initialState: { byContactId: {} } as MessagesState,
  reducers: {
    addMessage(
      state,
      action: PayloadAction<{ contactId: string; message: Message }>
    ) {
      const { contactId, message } = action.payload;
      if (!state.byContactId[contactId]) {
        state.byContactId[contactId] = [];
      }
      state.byContactId[contactId].push(message);
    },
    editMessage(
      state,
      action: PayloadAction<{
        contactId: string;
        messageId: string;
        newText: string;
      }>
    ) {
      const { contactId, messageId, newText } = action.payload;
      const messages = state.byContactId[contactId];
      if (messages) {
        const message = messages.find((msg) => msg.id === messageId);
        if (message) {
          message.text = newText;
        }
      }
    },
    deleteMessage(
      state,
      action: PayloadAction<{ contactId: string; messageId: string }>
    ) {
      const { contactId, messageId } = action.payload;
      const messages = state.byContactId[contactId];
      if (messages) {
        state.byContactId[contactId] = messages.filter(
          (msg) => msg.id !== messageId
        );
      }
    },
  },
});

export const { addContact, deleteContact, updateLastMessage } =
  contactsSlice.actions;
export const { addMessage, editMessage, deleteMessage } = messagesSlice.actions;

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  messages: messagesSlice.reducer,
});

export default rootReducer;
