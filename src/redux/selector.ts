// selectors.ts
import { createSelector } from 'reselect';
import { Message, RootState } from '../types';

// Memoized selector for contacts
export const selectContacts = createSelector(
  (state: RootState) => state.contacts.byId,
  (state: RootState) => state.contacts.allIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);

const selectMessagesState = (state: RootState) => state.messages.byContactId;

// Memoized selector to get messages for a specific contact
export const selectMessagesForContact = createSelector(
  [selectMessagesState, (_, contactId: string) => contactId],
  (messagesByContactId, contactId) => messagesByContactId[contactId] || []
);

export const selectLastMessages = createSelector(
  selectMessagesState,
  (messagesByContactId): Record<string, Message | undefined> => {
    const lastMessages: Record<string, Message | undefined> = {};

    Object.keys(messagesByContactId).forEach((contactId) => {
      const messages = messagesByContactId[contactId];
      if (messages && messages.length > 0) {
        lastMessages[contactId] = messages[messages.length - 1];
      } else {
        lastMessages[contactId] = undefined;
      }
    });

    return lastMessages;
  }
);
