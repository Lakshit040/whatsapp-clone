import { render, screen } from '@testing-library/react';

import { Mode } from '../../types';
import UserMessage from '../UserMessage';
import { ModeContext } from '../../contexts/ModeContext';
import userEvent from '@testing-library/user-event';

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

  const userMessageProps = {
    messageId: 'test-message-id',
    text: 'Test message',
    createdAt: '2024-10-12T12:00:00Z',
    onMessageDelete: mockOnMessageDelete,
    onMessageEdit: mockOnMessageEdit,
  };

  const renderUserMessage = (mode: Mode) => {
    render(
      <ModeContext.Provider value={{ mode: mode, toggleMode: jest.fn() }}>
        <UserMessage {...userMessageProps} />
      </ModeContext.Provider>
    );
  };

  it('renders the message text', () => {
    renderUserMessage(Mode.Compact);

    expect(screen.getByTestId('message-txt')).toBeInTheDocument();
  });

  it('renders the time when mode is spacious', () => {
    renderUserMessage(Mode.Spacious);

    expect(screen.getByTestId('msg-time')).toBeInTheDocument();
  });

  it('does not render the time when mode is compact', () => {
    renderUserMessage(Mode.Compact);

    expect(screen.queryByTestId('msg-time')).not.toBeInTheDocument();
  });

  it('calls onMessageEdit when the edit button is clicked', async () => {
    renderUserMessage(Mode.Compact);

    await userEvent.click(screen.getByTestId('edit-btn'));

    expect(mockOnMessageEdit).toHaveBeenCalledWith(
      'test-message-id',
      'edited text'
    );
  });

  it('calls onMessageDelete when the delete button is clicked', async () => {
    renderUserMessage(Mode.Compact);

    await userEvent.click(screen.getByTestId('delete-btn'));

    expect(mockOnMessageDelete).toHaveBeenCalledWith('test-message-id');
  });
});
