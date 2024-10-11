import { render, screen, fireEvent } from '@testing-library/react';
import FilteredOption from '../FilteredOption';
import { Contact } from '../../types';

const mockContact: Contact = {
  id: '1',
  name: 'John Doe',
};

describe('FilteredOption', () => {
  it('renders the contact name', () => {
    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={jest.fn()}
      />
    );

    expect(screen.getByText(mockContact.name)).toBeInTheDocument();
  });

  it('calls onOptionClick with the correct contact when clicked', () => {
    const onOptionClickMock = jest.fn();

    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={onOptionClickMock}
      />
    );

    fireEvent.click(screen.getByText(mockContact.name));

    expect(onOptionClickMock).toHaveBeenCalledTimes(1);
    expect(onOptionClickMock).toHaveBeenCalledWith(mockContact);
  });
});
