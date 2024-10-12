import { render, screen } from '@testing-library/react';
import FilteredOption from '../FilteredOption';
import { Contact } from '../../types';
import userEvent from '@testing-library/user-event';

describe('FilteredOption', () => {
  const mockContact: Contact = {
    id: '1',
    name: 'John Doe',
  };

  it('renders the contact name', () => {
    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={jest.fn()}
      />
    );

    expect(screen.getByTestId(mockContact.id)).toBeInTheDocument();
  });

  it('calls onOptionClick with the correct contact when clicked', async () => {
    const onOptionClickMock = jest.fn();

    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={onOptionClickMock}
      />
    );

    await userEvent.click(screen.getByTestId(mockContact.id));

    expect(onOptionClickMock).toHaveBeenCalledTimes(1);
    expect(onOptionClickMock).toHaveBeenCalledWith(mockContact);
  });
});
