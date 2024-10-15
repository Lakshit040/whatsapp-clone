import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SelectedContactContext } from '../../contexts/SelectedContactContext';
import { ModeContext } from '../../contexts/ModeContext';
import ContactsPanel from '..';
import { Mode } from '../../types';

jest.mock('../../ContactsPanel/ContactList', () =>
  jest.fn(() => <div data-testid='contact-list'>Contact List</div>)
);

jest.mock('../../ContactsPanel/SearchBar', () =>
  jest.fn(({ onContactSelect }) => (
    <div>
      <button
        data-testid='select-btn'
        onClick={() => onContactSelect({ id: '1', name: 'John Doe' })}
      >
        Select John
      </button>
    </div>
  ))
);

describe('ContactsPanel Component', () => {
  const setSelectedContactMock = jest.fn();

  it('renders correctly', () => {
    render(
      <SelectedContactContext.Provider
        value={{
          selectedContact: null,
          setSelectedContact: setSelectedContactMock,
        }}
      >
        <ModeContext.Provider
          value={{ mode: Mode.Spacious, toggleMode: jest.fn() }}
        >
          <ContactsPanel />
        </ModeContext.Provider>
      </SelectedContactContext.Provider>
    );

    expect(screen.getByTestId('profile-area')).toBeInTheDocument();
    expect(screen.getByTestId('import-contacts')).toBeInTheDocument();
    expect(screen.getByTestId('contact-list')).toBeInTheDocument();
  });

  it('calls setSelectedContact when a contact is selected', async () => {
    render(
      <SelectedContactContext.Provider
        value={{
          selectedContact: null,
          setSelectedContact: setSelectedContactMock,
        }}
      >
        <ModeContext.Provider
          value={{ mode: Mode.Spacious, toggleMode: jest.fn() }}
        >
          <ContactsPanel />
        </ModeContext.Provider>
      </SelectedContactContext.Provider>
    );

    await userEvent.click(screen.getByTestId('select-btn'));

    expect(setSelectedContactMock).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
    });
  });
});
