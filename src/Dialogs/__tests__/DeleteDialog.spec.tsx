import { render, screen, fireEvent } from '@testing-library/react';
import DeleteDialog from '../DeleteDialog';

describe('DeleteDialog', () => {
  const mockOnDelete = jest.fn();
  const contentId = '123';

  it('renders button with children and opens dialog on click', () => {
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

  it('calls onDelete with contentId on delete button click', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    fireEvent.click(screen.getByText('Delete Item'));
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(contentId);
  });

  it('closes dialog on Cancel button click', () => {
    render(
      <DeleteDialog contentId={contentId} onDelete={mockOnDelete}>
        Delete Item
      </DeleteDialog>
    );

    fireEvent.click(screen.getByText('Delete Item'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('does not call onDelete when cancel button is clicked', () => {
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
