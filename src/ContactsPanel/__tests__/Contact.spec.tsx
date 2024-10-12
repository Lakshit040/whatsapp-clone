import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  beforeEach(() => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Spacious });
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: null,
      setSelectedContact: setSelectedContactMock,
    });
  });

  it('renders the contact component with spacious mode', () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByTestId('spacious')).toBeInTheDocument();
    expect(screen.getByTestId('contact_1')).toBeInTheDocument();
    expect(screen.getByTestId('last_msgId_1')).toBeInTheDocument();
  });

  it('renders the contact component with compact mode', () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Compact });
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.queryByTestId('spacious')).not.toBeInTheDocument();
    expect(screen.getByTestId('contact_1')).toBeInTheDocument();
    expect(screen.queryByTestId('last_msgId_1')).not.toBeInTheDocument();
  });

  it('calls setSelectedContact when contact is clicked', async () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    await userEvent.click(screen.getByTestId('contact_1'));

    expect(setSelectedContactMock).toHaveBeenCalledWith(contact);
  });

  it('does not call setSelectedContact if the same contact is clicked', async () => {
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

    await userEvent.click(screen.getByTestId('contact_1'));
    expect(setSelectedContactMock).not.toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />
    );

    await userEvent.click(screen.getByTestId('delete-btn'));
    expect(onDeleteMock).toHaveBeenCalledWith(contact.id);
  });

  it('sets selected contact to null when deleted if it is the selected contact', async () => {
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

    await userEvent.click(screen.getByTestId('delete-btn'));
    expect(setSelectedContactMock).toHaveBeenCalledWith(null);
  });
});
