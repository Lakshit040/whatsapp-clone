import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContactList from '../../ContactsPanel/ContactList';
import { addContact, deleteContact } from '../../redux/reducer';
import reducer from '../../redux/reducer';
import { Contact, ContactsState, MessagesState } from '../../types';
import { ReactNode } from 'react';

const renderWithStore = (initialState: {
  contacts: ContactsState;
  messages: MessagesState;
}) => {
  const store = configureStore({ reducer, preloadedState: initialState });
  return render(
    <Provider store={store}>
      <ContactList />
    </Provider>
  );
};

jest.mock(
  '../../ContactsPanel/Contact',
  () =>
    ({
      contact,
      onDelete,
    }: {
      contact: Contact;
      onDelete: (contactId: string) => void;
    }) =>
      (
        <div data-testid={`contact_${contact.id}`}>
          <span>{contact.name}</span>
          <button onClick={() => onDelete(contact.id)}>Delete</button>
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

  test('renders contacts from the store', () => {
    renderWithStore(initialState);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('calls addContact when creating a new contact', () => {
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

  test('calls deleteContact when deleting a contact', () => {
    const store = configureStore({ reducer, preloadedState: initialState });
    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    const deleteButton = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton[0]);

    expect(spy).toHaveBeenCalledWith(deleteContact('1'));
  });
});
