import { render, screen } from '@testing-library/react';
import MessagePanelHeading from '../MessagePanelHeading';
import userEvent from '@testing-library/user-event';

describe('MessagePanelHeading', () => {
  const mockOnChatClose = jest.fn();

  it('renders correctly with the given name', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    expect(screen.getByTestId('contact-name')).toBeInTheDocument();
  });

  it('calls onChatClose when the close button is clicked', async () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(mockOnChatClose).toHaveBeenCalledTimes(1);
  });

  it('renders the search button', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });
});
