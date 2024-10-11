import { render, screen, fireEvent } from '@testing-library/react';
import CreateEditDialog from '../CreateEditDialog';

describe('CreateEditDialog', () => {
  const mockOnConfirm = jest.fn();

  it('renders component with children and opens dialog on click', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    const openButton = screen.getByText('Add Contact');
    expect(openButton).toBeInTheDocument();
    fireEvent.click(openButton);

    expect(screen.getByText('Add new Contact')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name here')).toBeInTheDocument();
  });

  it('form submission and calls onConfirm', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    fireEvent.change(screen.getByPlaceholderText('Enter name here'), {
      target: { value: 'John Doe' },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnConfirm).toHaveBeenCalledWith('John Doe');
  });

  it('does not call onConfirm when input is empty', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('closes the dialog on Cancel click', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Add new Contact')).not.toBeInTheDocument();
  });

  it('renders with initialValue and changes placeholder text', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm} initialValue='Hello'>
        Edit Message
      </CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Edit Message'));

    const inputElement = screen.getByPlaceholderText('Enter message here');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Hello');
  });
});
