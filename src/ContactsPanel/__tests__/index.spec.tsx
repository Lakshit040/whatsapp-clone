import { render, screen } from '@testing-library/react';

import { useSelectedContact } from '../../contexts/SelectedContactContext';
import ContactsPanel from '..';
import userEvent from '@testing-library/user-event';

jest.mock('../../ContactsPanel/ContactList', () =>
  jest.fn(() => <div data-testid='contact-list'>Contact List</div>)
);
jest.mock('../../ContactsPanel/ImportContacts', () =>
  jest.fn(() => <div data-testid='import-contacts'>Import Contacts</div>)
);
jest.mock('../../ContactsPanel/ProfileArea', () =>
  jest.fn(() => <div data-testid='profile-area'>Profile Area</div>)
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

jest.mock('../../contexts/SelectedContactContext', () => ({
  useSelectedContact: jest.fn(),
}));

describe('ContactsPanel Component', () => {
  const setSelectedContactMock: jest.Mock = jest.fn();

  beforeEach(() => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      setSelectedContact: setSelectedContactMock,
    });
  });

  it('renders correctly', () => {
    render(<ContactsPanel />);

    expect(screen.getByTestId('profile-area')).toBeInTheDocument();
    expect(screen.getByTestId('import-contacts')).toBeInTheDocument();
    expect(screen.getByTestId('contact-list')).toBeInTheDocument();
  });

  it('calls setSelectedContact when a contact is selected', async () => {
    render(<ContactsPanel />);

    await userEvent.click(screen.getByTestId('select-btn'));

    expect(setSelectedContactMock).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
    });
  });
});
