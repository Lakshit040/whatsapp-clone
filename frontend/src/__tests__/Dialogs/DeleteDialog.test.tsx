import { render, screen, fireEvent } from '@testing-library/react';
import DeleteDialog from '../../Dialogs/DeleteDialog';

describe('DeleteDialog', () => {
  const mockOnDelete = jest.fn();
  const contentId = '123';

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  test('renders button with children and opens dialog on click', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    const openButton = screen.getByText('Delete Item');
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onDelete with contentId on delete button click', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    fireEvent.click(screen.getByText('Delete Item'));

    fireEvent.click(screen.getByText('Delete'));

    expect(mockOnDelete).toHaveBeenCalledWith(contentId);
  });

  test('closes dialog on Cancel button click', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    fireEvent.click(screen.getByText('Delete Item'));

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  test('does not call onDelete when cancel button is clicked', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    fireEvent.click(screen.getByText('Delete Item'));

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
