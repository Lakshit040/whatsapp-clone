import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import MessagePanel from '..';

jest.mock('../../MessagePanel/DeliveredMessageComponent', () =>
  jest.fn(() => (
    <div data-testid='del-msg-component'>Mock DeliveredMessageComponent</div>
  ))
);

jest.mock('../../MessagePanel/AddMessageComponent', () =>
  jest.fn(() => (
    <div data-testid='add-msg-component'>Mock AddMessageComponent</div>
  ))
);

jest.mock('../../contexts/SelectedContactContext', () => ({
  useSelectedContact: jest.fn(),
}));

describe('MessagePanel', () => {
  const mockSetSelectedContact = jest.fn();

  it('renders default message panel', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: null,
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    expect(screen.getByTestId('default-msg-panel')).toBeInTheDocument();
  });

  it('renders lazy-loaded components when contact is selected', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    expect(screen.getByTestId('heading-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('delivered-fallback')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('contact-name')).toBeInTheDocument();
      expect(screen.getByTestId('del-msg-component')).toBeInTheDocument();
      expect(screen.getByTestId('add-msg-component')).toBeInTheDocument();
    });
  });

  it('calls setSelectedContact with null when chat is closed', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(mockSetSelectedContact).toHaveBeenCalledWith(null);
  });
});
