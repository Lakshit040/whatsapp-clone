import { render, screen } from '@testing-library/react';
import DeleteDialog from '../DeleteDialog';
import userEvent from '@testing-library/user-event';

describe('DeleteDialog', () => {
  const mockOnDelete = jest.fn();
  const contentId = '123';

  it('renders button with children and opens dialog on click', async () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    const openButton = screen.getByTestId('open-modal');

    expect(openButton).toBeInTheDocument();
    await userEvent.click(openButton);

    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
  });

  it('calls onDelete with contentId on delete button click', async () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));
    await userEvent.click(screen.getByTestId('confirm-btn'));
    expect(mockOnDelete).toHaveBeenCalledWith(contentId);
  });

  it('closes dialog on Cancel button click', async () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));
    await userEvent.click(screen.getByTestId('cancel-btn'));

    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument();
  });

  it('does not call onDelete when cancel button is clicked', async () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));
    await userEvent.click(screen.getByTestId('cancel-btn'));

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
