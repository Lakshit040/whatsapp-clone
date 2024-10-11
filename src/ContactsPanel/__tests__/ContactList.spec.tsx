import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContactList from '../ContactList';
import { addContact } from '../../redux/reducer';
import reducer from '../../redux/reducer';
import { Contact } from '../../types';
import { ReactNode } from 'react';

jest.mock(
  '../../ContactsPanel/Contact',
  () =>
    ({ contact }: { contact: Contact }) =>
      (
        <div data-testid={`contact_${contact.id}`}>
          <span>{contact.name}</span>
        </div>
      )
);

jest.mock(
  '../../Dialogs/CreateEditDialog',
  () =>
    ({
      onConfirm,
      children,
    }: {
      children: ReactNode;
      onConfirm: (value: string) => void;
    }) =>
      (
        <div>
          <button onClick={() => onConfirm('Mock Name')}>{children}</button>
        </div>
      )
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
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calls addContact when creating a new contact', () => {
    const store = configureStore({ reducer, preloadedState: initialState });
    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole('button', { name: /create new contact/i })
    );

    expect(spy).toHaveBeenCalledWith(
      addContact({
        id: expect.any(String),
        name: 'Mock Name',
      })
    );
  });
});
