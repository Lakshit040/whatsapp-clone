import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSelectedContact } from '../../contexts/SelectedContactContext';
import MessagePanel from '..';

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

    expect(
      screen.getByText('Select a conversation to get started!')
    ).toBeInTheDocument();
  });

  it('renders lazy-loaded components when contact is selected', async () => {
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

  it('calls setSelectedContact with null when chat is closed', async () => {
    (useSelectedContact as jest.Mock).mockReturnValue({
      selectedContact: { id: '1', name: 'John Doe' },
      setSelectedContact: mockSetSelectedContact,
    });

    render(<MessagePanel />);

    fireEvent.click(screen.getByText('Mock MessagePanelHeading'));

    expect(mockSetSelectedContact).toHaveBeenCalledWith(null);
  });
});
