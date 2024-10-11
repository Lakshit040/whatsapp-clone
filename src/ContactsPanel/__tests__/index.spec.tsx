import { render, screen } from '@testing-library/react';

import { useSelectedContact } from '../../contexts/SelectedContactContext';
import ContactsPanel from '..';

jest.mock('../../ContactsPanel/ContactList', () =>
  jest.fn(() => <div>Contact List</div>)
);
jest.mock('../../ContactsPanel/ImportContacts', () =>
  jest.fn(() => <div>Import Contacts</div>)
);
jest.mock('../../ContactsPanel/ProfileArea', () =>
  jest.fn(() => <div>Profile Area</div>)
);
jest.mock('../../ContactsPanel/SearchBar', () =>
  jest.fn(({ onContactSelect }) => (
    <div>
      <button onClick={() => onContactSelect({ id: '1', name: 'John Doe' })}>
        Select John
      </button>
    </div>
  ))
);

jest.mock('../../contexts/SelectedContactContext', () => ({
  useSelectedContact: jest.fn(),
}));

describe('ContactsPanel Component', () => {
  let setSelectedContactMock: jest.Mock = jest.fn();

  (useSelectedContact as jest.Mock).mockReturnValue({
    setSelectedContact: setSelectedContactMock,
  });

  it('renders correctly', () => {
    render(<ContactsPanel />);

    expect(screen.getByText('Profile Area')).toBeInTheDocument();
    expect(screen.getByText('Import Contacts')).toBeInTheDocument();
    expect(screen.getByText('Contact List')).toBeInTheDocument();
  });

  it('calls setSelectedContact when a contact is selected', () => {
    render(<ContactsPanel />);

    const selectButton = screen.getByRole('button', { name: 'Select John' });
    selectButton.click();

    expect(setSelectedContactMock).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
    });
  });
});

// use test-id always
