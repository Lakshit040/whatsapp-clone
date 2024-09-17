// reducers.ts
import { combineReducers } from 'redux';
import {
  ContactActionType,
  MessageActionType,
  ContactsState,
  MessagesState,
  ActionTypes,
} from './types';

const contactsReducer = (
  state: ContactsState = { byId: {}, allIds: [], lastMessages: {} },
  action: ActionTypes
): ContactsState => {
  switch (action.type) {
    case ContactActionType.AddContact:
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: [...state.allIds, action.payload.id],
      };
    case ContactActionType.DeleteContact:
      const { [action.payload]: removedContact, ...rest } = state.byId;
      return {
        ...state,
        byId: rest,
        allIds: state.allIds.filter((id) => id !== action.payload),
        lastMessages: { ...state.lastMessages, [action.payload]: undefined },
      };
    case ContactActionType.UpdateLastMessage:
      return {
        ...state,
        lastMessages: {
          ...state.lastMessages,
          [action.payload.contactId]: action.payload.message,
        },
      };
    default:
      return state;
  }
};

const messagesReducer = (
  state: MessagesState = { byContactId: {} },
  action: ActionTypes
): MessagesState => {
  switch (action.type) {
    case MessageActionType.AddMessage:
      return {
        ...state,
        byContactId: {
          ...state.byContactId,
          [action.payload.contactId]: [
            ...(state.byContactId[action.payload.contactId] || []),
            action.payload.message,
          ],
        },
      };
    case MessageActionType.EditMessage:
      return {
        ...state,
        byContactId: {
          ...state.byContactId,
          [action.payload.contactId]: state.byContactId[
            action.payload.contactId
          ].map((message) =>
            message.id === action.payload.messageId
              ? { ...message, text: action.payload.newText }
              : message
          ),
        },
      };
    case MessageActionType.DeleteMessage:
      const updatedMessages = state.byContactId[
        action.payload.contactId
      ].filter((message) => message.id !== action.payload.messageId);
      return {
        ...state,
        byContactId: {
          ...state.byContactId,
          [action.payload.contactId]: updatedMessages,
        },
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  messages: messagesReducer,
});

export default rootReducer;
