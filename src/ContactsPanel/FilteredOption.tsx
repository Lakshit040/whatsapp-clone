import { useCallback } from 'react';
import { Contact } from '../types';

interface FilteredOptionProps {
  isHighlighted: boolean;
  option: Contact;
  onOptionClick: (contact: Contact) => void;
}

const FilteredOption = ({
  isHighlighted,
  option,
  onOptionClick,
}: FilteredOptionProps) => {
  const handleOptionClick = useCallback(() => {
    onOptionClick(option);
  }, [option]);
  return (
    <li
      data-testid={option.id}
      className={`p-2 cursor-pointer hover:bg-gray-600 ${
        isHighlighted ? 'bg-gray-600' : ''
      }`}
      onClick={handleOptionClick}
    >
      {option.name}
    </li>
  );
};

export default FilteredOption;
