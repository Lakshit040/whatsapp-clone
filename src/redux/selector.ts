// selectors.ts
import { createSelector } from 'reselect';
import { RootState } from '../types';

// Memoized selector for contacts
const selectContacts = createSelector(
  (state: RootState) => state.contacts.byId,
  (state: RootState) => state.contacts.allIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);

const selectMessagesState = (state: RootState) => state.messages.byContactId;

// Memoized selector to get messages for a specific contact
export const selectMessagesForContact = createSelector(
  [selectMessagesState, (state: RootState, contactId: string) => contactId],
  (messagesByContactId, contactId) => messagesByContactId[contactId] || []
);

export default selectContacts;
