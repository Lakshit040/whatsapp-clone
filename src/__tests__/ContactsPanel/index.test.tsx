import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import ContactsPanel from '../../ContactsPanel';

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
  let setSelectedContactMock: jest.Mock;

  beforeEach(() => {
    setSelectedContactMock = jest.fn();

    // Mocking the context return value
    (useSelectedContact as jest.Mock).mockReturnValue({
      setSelectedContact: setSelectedContactMock,
    });
  });

  test('renders correctly', () => {
    render(<ContactsPanel />);

    // Check if ProfileArea, ImportContacts, SearchBar, and ContactList are rendered
    expect(screen.getByText('Profile Area')).toBeInTheDocument();
    expect(screen.getByText('Import Contacts')).toBeInTheDocument();
    expect(screen.getByText('Contact List')).toBeInTheDocument();
  });

  test('calls setSelectedContact when a contact is selected', () => {
    render(<ContactsPanel />);

    // Find the button to simulate contact selection and click it
    const selectButton = screen.getByRole('button', { name: /Select John/i });
    selectButton.click();

    // Assert that setSelectedContact was called with the correct contact
    expect(setSelectedContactMock).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
    });
  });
});
