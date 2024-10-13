import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

import Contact from '../Contact';
import { Mode, Contact as ContactType, Message } from '../../types';
import { ModeContext } from '../../contexts/ModeContext';
import { SelectedContactContext } from '../../contexts/SelectedContactContext';

interface ProviderWrapperProps {
  mode?: Mode;
  initialSelectedContact?: ContactType | null;
}

describe('Contact Component', () => {
  const contact: ContactType = { id: '1', name: 'John Doe' };
  const lastMessage: Message = {
    id: 'msgId_1',
    text: 'Hello, this is a test message.',
    createdAt: new Date().toISOString(),
    contactId: '1',
  };
  const onDeleteMock = jest.fn();
  const setSelectedContactMock = jest.fn();

  const renderWithProviders = (
    children: ReactNode,
    {
      mode = Mode.Spacious,
      initialSelectedContact = null,
    }: ProviderWrapperProps
  ) => {
    return render(
      <ModeContext.Provider value={{ mode, toggleMode: jest.fn() }}>
        <SelectedContactContext.Provider
          value={{
            selectedContact: initialSelectedContact,
            setSelectedContact: setSelectedContactMock,
          }}
        >
          {children}
        </SelectedContactContext.Provider>
      </ModeContext.Provider>
    );
  };

  it('renders the contact component with spacious mode', () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { mode: Mode.Spacious }
    );

    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('spacious')).toBeInTheDocument();
    expect(screen.getByTestId('contact-name')).toBeInTheDocument();
    expect(screen.getByTestId('last-msg')).toBeInTheDocument();
  });

  it('renders the contact component with compact mode', () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { mode: Mode.Compact }
    );

    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.queryByTestId('spacious')).not.toBeInTheDocument();
    expect(screen.getByTestId('contact-name')).toBeInTheDocument();
    expect(screen.queryByTestId('last-msg')).not.toBeInTheDocument();
  });

  it('calls setSelectedContact when a different contact is clicked', async () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { initialSelectedContact: null }
    );

    await userEvent.click(screen.getByTestId('contact'));
    expect(setSelectedContactMock).toHaveBeenCalledWith(contact);
  });

  it('does not call setSelectedContact if the same contact is clicked', async () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { initialSelectedContact: contact }
    );

    const contactElement = screen.getByTestId('contact');
    expect(contactElement).toHaveClass('bg-contact-active');
    await userEvent.click(contactElement);
    expect(screen.getByTestId('contact')).toHaveClass('bg-contact-active');
    expect(setSelectedContactMock).not.toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', async () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { initialSelectedContact: null }
    );

    await userEvent.click(screen.getByTestId('delete-btn'));
    expect(onDeleteMock).toHaveBeenCalledWith(contact.id);
  });

  it('sets selected contact to null when deleted if it is the selected contact', async () => {
    renderWithProviders(
      <Contact
        contact={contact}
        lastMessage={lastMessage}
        onDelete={onDeleteMock}
      />,
      { initialSelectedContact: contact }
    );

    await userEvent.click(screen.getByTestId('delete-btn'));

    expect(onDeleteMock).toHaveBeenCalledWith(contact.id);
    expect(setSelectedContactMock).toHaveBeenCalledWith(null);
  });
});
