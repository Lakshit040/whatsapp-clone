import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useMode } from '../../contexts/ModeContext';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import Contact from '../../ContactsPanel/Contact';
import { Mode } from '../../types';

jest.mock('../../contexts/ModeContext', () => ({
  useMode: jest.fn(),
}));

jest.mock('../../contexts/SelectedContactContext', () => ({
  useSelectedContact: jest.fn(),
}));

describe('Contact Component', () => {
  const contact = { id: '1', name: 'John Doe' };
  const lastMessage = {
    id: 'msgId_1',
    text: 'Hello, this is a test message.',
    createdAt: new Date().toISOString(),
    contactId: '1',
  };
  const onDeleteMock = jest.fn();
  const setSelectedContactMock = jest.fn();

  beforeEach(() => {
    // Mocking context return values
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Spacious });
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: null,
      setSelectedContact: setSelectedContactMock,
    });
  });

  test('renders the contact component', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    // Check if contact name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if last message text is rendered
    expect(
      screen.getByText('Hello, this is a test message.')
    ).toBeInTheDocument();
  });

  test('calls setSelectedContact when contact is clicked', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    // Click on the contact to select it
    fireEvent.click(screen.getByText('John Doe'));

    // Assert that setSelectedContact was called with the contact
    expect(setSelectedContactMock).toHaveBeenCalledWith(contact);
  });

  test('does not call setSelectedContact if the same contact is clicked', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: contact, // Simulating the selected contact
      setSelectedContact: setSelectedContactMock,
    });

    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    // Click on the contact again
    fireEvent.click(screen.getByText('John Doe'));

    // Assert that setSelectedContact was not called
    expect(setSelectedContactMock).not.toHaveBeenCalled();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    // Simulate clicking the delete button
    fireEvent.mouseEnter(screen.getByText('John Doe')); // Show the delete button
    fireEvent.click(screen.getByRole('button', { name: /Delete contact/i }));

    // Assert that onDelete was called with the correct contact ID
    expect(onDeleteMock).toHaveBeenCalledWith(contact.id);
  });

  test('sets selected contact to null when deleted if it is the selected contact', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: contact, // Simulating the selected contact
      setSelectedContact: setSelectedContactMock,
    });

    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    // Simulate clicking the delete button
    fireEvent.mouseEnter(screen.getByText('John Doe')); // Show the delete button
    fireEvent.click(screen.getByRole('button', { name: /Delete contact/i }));

    // Assert that setSelectedContact was called with null
    expect(setSelectedContactMock).toHaveBeenCalledWith(null);
  });
});
