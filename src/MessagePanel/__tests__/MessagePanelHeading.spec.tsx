import { render, screen, fireEvent } from '@testing-library/react';
import MessagePanelHeading from '../MessagePanelHeading';

jest.mock('../../icons', () => ({
  SearchButton: ({
    className,
    title,
  }: {
    className: string;
    title: string;
  }) => <button className={className} title={title} />,
  CloseButton: ({
    className,
    title,
    onClick,
  }: {
    className: string;
    title: string;
    onClick: () => void;
  }) => <button className={className} title={title} onClick={onClick} />,
}));

describe('MessagePanelHeading', () => {
  const mockOnChatClose = jest.fn();

  it('renders correctly with the given name', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls onChatClose when the close button is clicked', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    fireEvent.click(screen.getByTitle('Close Chat'));

    expect(mockOnChatClose).toHaveBeenCalledTimes(1);
  });

  it('renders the search button', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    expect(screen.getByTitle('Search a message')).toBeInTheDocument();
  });
});
