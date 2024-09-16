import { useCallback } from 'react';
import { Contact } from '../utils';

interface FilteredOptionProps {
  isHighlighted: boolean;
  option: Contact;
  onOptionClick: (option: Contact) => void;
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
