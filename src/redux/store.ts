// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { loadState, saveState } from '../utils';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    contacts: store.getState().contacts,
    messages: store.getState().messages,
  });
});

export default store;
