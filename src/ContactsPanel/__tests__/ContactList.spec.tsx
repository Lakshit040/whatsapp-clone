import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ContactList from '../ContactList';
import reducer, { addContact } from '../../redux/reducer';
import { Contact } from '../../types';

jest.mock(
  '../../ContactsPanel/Contact',
  jest.fn(() => ({ contact }: { contact: Contact }) => (
    <div data-testid={`contact_${contact.id}`}>
      <span>{contact.name}</span>
    </div>
  ))
);

describe('ContactList', () => {
  const initialState = {
    contacts: {
      byId: {
        '1': { id: '1', name: 'John Doe' },
        '2': { id: '2', name: 'Jane Smith' },
      },
      allIds: ['1', '2'],
      lastMessages: {},
    },
    messages: {
      byContactId: {
        '1': [
          {
            id: '1',
            contactId: '1',
            text: 'Hello!',
            createdAt: '2024-10-01T00:00:00Z',
          },
        ],
        '2': [
          {
            id: '2',
            contactId: '2',
            text: 'How are you?',
            createdAt: '2024-10-01T00:00:01Z',
          },
        ],
      },
    },
  };

  it('renders contacts from the store', () => {
    const store = configureStore({ reducer, preloadedState: initialState });
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );
    expect(screen.getByTestId('contact_1')).toBeInTheDocument();
    expect(screen.getByTestId('contact_2')).toBeInTheDocument();
    expect(screen.getByTestId('create-new-contact-btn')).toBeInTheDocument();
  });

  it('calls addContact when creating a new contact', async () => {
    const store = configureStore({ reducer, preloadedState: initialState });
    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('create-new-contact-btn'));

    const modalInput = screen.getByTestId('modal-input');

    expect(modalInput).toBeInTheDocument();
    await userEvent.type(modalInput, 'Mock Name');
    await userEvent.click(screen.getByTestId('confirm-btn'));

    expect(spy).toHaveBeenCalledWith(
      addContact({
        id: expect.any(String),
        name: 'Mock Name',
      })
    );
  });
});
