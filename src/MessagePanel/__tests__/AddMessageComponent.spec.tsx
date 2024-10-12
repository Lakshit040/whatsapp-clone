import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { addMessage, updateLastMessage } from '../../redux/reducer';
import AddMessageComponent from '../AddMessageComponent';
import { RootState } from '../../types';

const renderWithStore = (initialState: RootState, contactId: string) => {
  const store = configureStore({ reducer, preloadedState: initialState });
  render(
    <Provider store={store}>
      <AddMessageComponent contactId={contactId} />
    </Provider>
  );
  return store;
};

describe('AddMessageComponent', () => {
  const contactId = '123';
  const initialState: RootState = {
    contacts: {
      byId: {
        [contactId]: { id: contactId, name: 'John Doe' },
      },
      allIds: [contactId],
      lastMessages: {},
    },
    messages: {
      byContactId: {
        [contactId]: [],
      },
    },
  };

  it('renders textarea and send button', () => {
    renderWithStore(initialState, contactId);

    expect(screen.getByTestId('msg-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-btn')).toBeInTheDocument();
  });

  it('allows typing a message', async () => {
    renderWithStore(initialState, contactId);

    const textarea = screen.getByTestId('msg-input');
    await userEvent.type(textarea, 'Hello, John!');

    expect(textarea).toHaveValue('Hello, John!');
  });

  it('dispatches addMessage and updateLastMessage when form is submitted', async () => {
    const store = renderWithStore(initialState, contactId);
    const spy = jest.spyOn(store, 'dispatch');

    const textarea = screen.getByTestId('msg-input');

    await userEvent.type(textarea, 'Hello, John!');
    await userEvent.click(screen.getByTestId('send-btn'));

    expect(spy).toHaveBeenCalledWith(
      addMessage({
        contactId,
        message: {
          id: expect.any(String),
          text: 'Hello, John!',
          contactId,
          createdAt: expect.any(String),
        },
      })
    );

    expect(spy).toHaveBeenCalledWith(
      updateLastMessage({
        contactId,
        message: {
          id: expect.any(String),
          text: 'Hello, John!',
          contactId,
          createdAt: expect.any(String),
        },
      })
    );

    expect(textarea).toHaveValue('');
  });

  it('Do nothing when message is empty', async () => {
    const store = renderWithStore(initialState, contactId);
    const spy = jest.spyOn(store, 'dispatch');

    const textarea = screen.getByTestId('msg-input');
    await userEvent.click(screen.getByTestId('send-btn'));

    expect(spy).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });
});
