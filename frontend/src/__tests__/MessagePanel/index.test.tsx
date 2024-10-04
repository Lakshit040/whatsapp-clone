import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import MessagePanel from '../../MessagePanel';

jest.mock('../../MessagePanel/MessagePanelHeading', () =>
  jest.fn(({ onChatClose }: { onChatClose: () => void }) => (
    <div onClick={onChatClose}>Mock MessagePanelHeading</div>
  ))
);
jest.mock('../../MessagePanel/DeliveredMessageComponent', () =>
  jest.fn(() => <div>Mock DeliveredMessageComponent</div>)
);
jest.mock('../../MessagePanel/AddMessageComponent', () =>
  jest.fn(() => <div>Mock AddMessageComponent</div>)
);

jest.mock('../../Fallbacks/HeadingFallback', () =>
  jest.fn(() => <div>Loading Heading...</div>)
);
jest.mock('..//../Fallbacks/DeliveredMessageFallback', () =>
  jest.fn(() => <div>Loading Delivered Messages...</div>)
);
jest.mock('../../Fallbacks/AddMessageFallback', () =>
  jest.fn(() => <div>Loading Add Message...</div>)
);

jest.mock('../../contexts/SelectedContactContext', () => ({
  useSelectedContact: jest.fn(),
}));

describe('MessagePanel', () => {
  const mockSetSelectedContact = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Select a conversation" message when no contact is selected', () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: null,
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    expect(
      screen.getByText('Select a conversation to get started!')
    ).toBeInTheDocument();
  });

  test('renders lazy-loaded components when contact is selected', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    await waitFor(() => {
      expect(screen.getByText('Mock MessagePanelHeading')).toBeInTheDocument();
      expect(
        screen.getByText('Mock DeliveredMessageComponent')
      ).toBeInTheDocument();
      expect(screen.getByText('Mock AddMessageComponent')).toBeInTheDocument();
    });
  });

  test('renders fallback components during lazy loading', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    await waitFor(() => {
      expect(screen.getByText('Mock MessagePanelHeading')).toBeInTheDocument();
      expect(
        screen.getByText('Mock DeliveredMessageComponent')
      ).toBeInTheDocument();
      expect(screen.getByText('Mock AddMessageComponent')).toBeInTheDocument();
    });
  });

  test('calls setSelectedContact with null when chat is closed', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    fireEvent.click(screen.getByText('Mock MessagePanelHeading'));

    expect(mockSetSelectedContact).toHaveBeenCalledWith(null);
  });
});
