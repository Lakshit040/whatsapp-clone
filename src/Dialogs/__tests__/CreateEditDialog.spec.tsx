import { render, screen } from '@testing-library/react';
import CreateEditDialog from '../CreateEditDialog';
import userEvent from '@testing-library/user-event';

describe('CreateEditDialog', () => {
  const mockOnConfirm = jest.fn();

  it('renders component with children and opens dialog on click', async () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    const openButton = screen.getByTestId('open-modal');
    expect(openButton).toBeInTheDocument();
    await userEvent.click(openButton);

    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('modal-input')).toBeInTheDocument();
  });

  it('form submission and calls onConfirm', async () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));

    await userEvent.type(screen.getByTestId('modal-input'), 'John Doe');

    await userEvent.click(screen.getByTestId('save-btn'));

    expect(mockOnConfirm).toHaveBeenCalledWith('John Doe');
  });

  it('does not call onConfirm when input is empty', async () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));

    await userEvent.click(screen.getByTestId('save-btn'));

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('closes the dialog on Cancel click', async () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm}>Add Contact</CreateEditDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));

    await userEvent.click(screen.getByTestId('cancel-btn'));

    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument();
  });

  it('renders with initialValue and changes placeholder text', async () => {
    render(
      <CreateEditDialog onConfirm={mockOnConfirm} initialValue='Hello'>
        Edit Message
      </CreateEditDialog>
    );

    await userEvent.click(screen.getByTestId('open-modal'));

    const inputElement = screen.getByTestId('modal-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Hello');
  });
});
