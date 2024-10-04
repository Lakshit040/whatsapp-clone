import { render, screen, fireEvent } from '@testing-library/react';
import MessagePanelHeading from '../../MessagePanel/MessagePanelHeading';

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

jest.mock('../../utils', () => ({
  PROFILE_IMG: 'https://example.com/profile.jpg',
}));

describe('MessagePanelHeading', () => {
  const mockOnChatClose = jest.fn();

  it('renders correctly with the given name and profile image', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    const profileImg = screen.getByAltText('John Doe');
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute(
      'src',
      'https://example.com/profile.jpg'
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls onChatClose when the close button is clicked', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    const closeButton = screen.getByTitle('Close Chat');
    fireEvent.click(closeButton);

    expect(mockOnChatClose).toHaveBeenCalledTimes(1);
  });

  it('renders the search button', () => {
    render(
      <MessagePanelHeading name='John Doe' onChatClose={mockOnChatClose} />
    );

    expect(screen.getByTitle('Search a message')).toBeInTheDocument();
  });
});
