import { render, screen } from '@testing-library/react';

import { Mode } from '../../types';
import UserMessage from '../UserMessage';
import { useMode } from '../../contexts/ModeContext';
import userEvent from '@testing-library/user-event';

jest.mock('../../contexts/ModeContext', () => ({
  useMode: jest.fn(),
}));

jest.mock('../../Dialogs/DeleteDialog', () => ({ children, onDelete }: any) => (
  <div onClick={() => onDelete('test-message-id')}>{children}</div>
));
jest.mock(
  '../../Dialogs/CreateEditDialog',
  () =>
    ({ children, onConfirm }: any) =>
      <div onClick={() => onConfirm('edited text')}>{children}</div>
);

describe('UserMessage', () => {
  const mockOnMessageDelete = jest.fn();
  const mockOnMessageEdit = jest.fn();

  const defaultProps = {
    messageId: 'test-message-id',
    text: 'Test message',
    createdAt: '2024-10-12T12:00:00Z',
    onMessageDelete: mockOnMessageDelete,
    onMessageEdit: mockOnMessageEdit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the message text', () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Compact });
    render(<UserMessage {...defaultProps} />);

    expect(screen.getByTestId('message-txt')).toBeInTheDocument();
  });

  it('renders the time when mode is spacious', () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Spacious });
    render(<UserMessage {...defaultProps} />);

    expect(screen.getByTestId('msg-time')).toBeInTheDocument();
  });

  it('does not render the time when mode is compact', () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Compact });
    render(<UserMessage {...defaultProps} />);

    expect(screen.queryByTestId('msg-time')).not.toBeInTheDocument();
  });

  it('calls onMessageEdit when the edit button is clicked', async () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Compact });
    render(<UserMessage {...defaultProps} />);

    await userEvent.click(screen.getByTestId('edit-btn'));

    expect(mockOnMessageEdit).toHaveBeenCalledWith(
      'test-message-id',
      'edited text'
    );
  });

  it('calls onMessageDelete when the delete button is clicked', async () => {
    (useMode as jest.Mock).mockReturnValue({ mode: Mode.Compact });
    render(<UserMessage {...defaultProps} />);

    await userEvent.click(screen.getByTestId('delete-btn'));

    expect(mockOnMessageDelete).toHaveBeenCalledWith('test-message-id');
  });
});
