import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../Dialog';

describe('Dialog', () => {
  const mockOnClose = jest.fn();

  const renderDialog = (isOpen: boolean) =>
    render(
      <Dialog isOpen={isOpen} onClose={mockOnClose}>
        <Dialog.Header>Modal Header</Dialog.Header>
        <Dialog.Body>Modal Body</Dialog.Body>
        <Dialog.Footer>Modal Footer</Dialog.Footer>
      </Dialog>
    );

  it('renders nothing when isOpen is false', () => {
    renderDialog(false);

    expect(screen.queryByText('Modal Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Body')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Footer')).not.toBeInTheDocument();
  });

  it('renders the dialog when isOpen is true', () => {
    renderDialog(true);

    expect(screen.getByText('Modal Header')).toBeInTheDocument();
    expect(screen.getByText('Modal Body')).toBeInTheDocument();
    expect(screen.getByText('Modal Footer')).toBeInTheDocument();
  });

  it('closes the dialog when clicking outside the modal', () => {
    renderDialog(true);

    fireEvent.click(screen.getByRole('dialog').parentElement!);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close the dialog when clicking inside the modal', () => {
    renderDialog(true);

    fireEvent.click(screen.getByText('Modal Body'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
