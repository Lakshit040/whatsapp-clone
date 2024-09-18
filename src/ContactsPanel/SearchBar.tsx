import { useCallback, useState, memo, FormEvent } from 'react';

import { SearchButton } from '../icons';
import FilteredOption from './FilteredOption';
import { Contact } from '../redux/types';
import selectContacts from '../redux/selector';
import { useSelector } from 'react-redux';

interface SearchBarProps {
  onContactSelect: (contact: Contact) => void;
}

const SearchBar = memo(({ onContactSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Contact[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const contacts = useSelector(selectContacts);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setQuery(value);
      if (value) {
        const filtered = contacts.filter((option) =>
          option.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
        setHighlightedIndex(-1);
      } else {
        setFilteredOptions([]);
      }
    },
    [contacts]
  );

  const handleOptionClick = useCallback(
    (contact: Contact) => {
      setQuery('');
      setFilteredOptions([]);
      setHighlightedIndex(-1);
      onContactSelect(contact);
    },
    [onContactSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
      }
    },
    [filteredOptions, highlightedIndex, handleOptionClick]
  );

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionClick(filteredOptions[0]);
      }
    },
    [filteredOptions, handleOptionClick]
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className='container mx-auto py-2.5 px-2 w-full border-b-[.5px] border-gray-600 bg-gray-900 bg-opacity-35'
    >
      <div className='relative bg-gray-700 flex items-center py-2 px-3 rounded-xl'>
        <label
          htmlFor='inputId'
          className='px-2 flex items-center justify-center'
        >
          <SearchButton className='w-5 h-5 text-gray-400' />
        </label>
        <input
          id='inputId'
          type='text'
          placeholder='Search or start a new chat'
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className='pl-3 flex-1 bg-gray-700 focus:outline-none placeholder:text-sm placeholder:text-gray-400 font-poppins text-sm'
        />
        {filteredOptions.length > 0 && (
          <ul className='absolute top-full left-0 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10'>
            {filteredOptions.map((option, index) => (
              <FilteredOption
                key={option.id}
                isHighlighted={highlightedIndex === index}
                option={option}
                onOptionClick={handleOptionClick}
              />
            ))}
          </ul>
        )}
      </div>
    </form>
  );
});

export default SearchBar;
