import { render, screen, fireEvent } from '@testing-library/react';
import CreateEditDialog from '../../Dialogs/CreateEditDialog';

describe('CreateEditDialog', () => {
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
  });

  test('renders button with children and opens dialog on click', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    const openButton = screen.getByText('Add Contact');
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    expect(screen.getByText('Add new Contact')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name here')).toBeInTheDocument();
  });

  test('handles form submission and calls onConfirm with input value', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    const inputElement = screen.getByPlaceholderText('Enter name here');
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnConfirm).toHaveBeenCalledWith('John Doe');
  });

  test('does not call onConfirm when input is empty', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test('closes the dialog on Cancel click', () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    fireEvent.click(screen.getByText('Add Contact'));

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Add new Contact')).not.toBeInTheDocument();
  });

  test('renders with initialValue and changes placeholder text', () => {
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
