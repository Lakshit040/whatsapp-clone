import { render, screen, fireEvent } from '@testing-library/react';
import FilteredOption from '../../ContactsPanel/FilteredOption';
import { Contact } from '../../types';

const mockContact: Contact = {
  id: '1',
  name: 'John Doe',
};

describe('FilteredOption', () => {
  test('renders the contact name', () => {
    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={jest.fn()}
      />
    );

    expect(screen.getByText(mockContact.name)).toBeInTheDocument();
  });

  test('calls onOptionClick with the correct contact when clicked', () => {
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

  test('applies highlighted class when isHighlighted is true', () => {
    render(
      <FilteredOption
        isHighlighted={true}
        option={mockContact}
        onOptionClick={jest.fn()}
      />
    );

    const optionElement = screen.getByText(mockContact.name);
    expect(optionElement).toHaveClass('bg-gray-600');
  });

  test('does not apply highlighted class when isHighlighted is false', () => {
    render(
      <FilteredOption
        isHighlighted={false}
        option={mockContact}
        onOptionClick={jest.fn()}
      />
    );

    const optionElement = screen.getByText(mockContact.name);
    expect(optionElement).not.toHaveClass('bg-gray-600');
  });
});
