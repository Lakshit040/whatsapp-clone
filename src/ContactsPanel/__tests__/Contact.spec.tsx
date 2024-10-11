import { render, screen, fireEvent } from '@testing-library/react';

import { useMode } from '../../contexts/ModeContext';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import Contact from '../Contact';
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

  (useMode as jest.Mock).mockReturnValue({ mode: Mode.Spacious });
  (useSelectedContact as jest.Mock).mockReturnValue({
    selectedContact: null,
    setSelectedContact: setSelectedContactMock,
  });

  it('renders the contact component', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    expect(
      screen.getByText('Hello, this is a test message.')
    ).toBeInTheDocument();
  });

  it('calls setSelectedContact when contact is clicked', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));

    expect(setSelectedContactMock).toHaveBeenCalledWith(contact);
  });

  it('does not call setSelectedContact if the same contact is clicked', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: contact,
      setSelectedContact: setSelectedContactMock,
    });

    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));

    expect(setSelectedContactMock).not.toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.mouseEnter(screen.getByText('John Doe'));
    fireEvent.click(screen.getByRole('button', { name: /Delete contact/i }));

    expect(onDeleteMock).toHaveBeenCalledWith(contact.id);
  });

  it('sets selected contact to null when deleted if it is the selected contact', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: contact,
      setSelectedContact: setSelectedContactMock,
    });

    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.mouseEnter(screen.getByText('John Doe'));
    fireEvent.click(screen.getByRole('button', { name: /Delete contact/i }));

    expect(setSelectedContactMock).toHaveBeenCalledWith(null);
  });
});
