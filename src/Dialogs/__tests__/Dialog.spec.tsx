import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../Dialog';
import userEvent from '@testing-library/user-event';

describe('Dialog', () => {
  const mockOnClose = jest.fn();

  const renderDialog = (isOpen: boolean) =>
    render(
      <Dialog isOpen={isOpen} onClose={mockOnClose}>
        <Dialog.Header>
          <span data-testid='modal-header'>Modal Header</span>
        </Dialog.Header>
        <Dialog.Body>
          <span data-testid='modal-body'>Modal Body</span>
        </Dialog.Body>
        <Dialog.Footer>
          <span data-testid='modal-footer'>Modal Footer</span>
        </Dialog.Footer>
      </Dialog>
    );

  it('renders nothing when isOpen is false', () => {
    renderDialog(false);

    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument();
  });

  it('renders the dialog when isOpen is true', () => {
    renderDialog(true);

    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('modal-body')).toBeInTheDocument();
    expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
  });

  it('closes the dialog when clicking outside the modal', async () => {
    renderDialog(true);

    fireEvent.click(screen.getByTestId('dialog').parentElement!);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close the dialog when clicking inside the modal', async () => {
    renderDialog(true);

    await userEvent.click(screen.getByTestId('modal-body'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
