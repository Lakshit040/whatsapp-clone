import { useCallback, useState, memo, useEffect } from 'react';
import { useContacts, type ContactProps } from '../contexts/ContactsContext';

import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  onContactSelect: (contact: ContactProps) => void;
}

const SearchBar = memo(({ onContactSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<ContactProps[]>([]);
  const { contacts } = useContacts();

  useEffect(() => {
    console.log('Rendered SearchBar');
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setQuery(value);

      if (value) {
        const filtered = contacts.filter((option) =>
          option.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions([]);
      }
    },
    [contacts, setFilteredOptions, setQuery]
  );

  const handleOptionClick = useCallback(
    (contact: ContactProps) => {
      setQuery('');
      setFilteredOptions([]);
      onContactSelect(contact);
    },
    [onContactSelect, setQuery, setFilteredOptions]
  );

  return (
    <div className='container mx-auto py-2.5 px-2 w-full border-b-[.5px] border-gray-600 bg-gray-900 bg-opacity-35'>
      <div className='relative bg-gray-700 flex items-center py-2 px-3 rounded-xl'>
        <label
          htmlFor='inputId'
          className='px-2 flex items-center justify-center'
        >
          <IoSearch className='w-5 h-5 text-gray-400' />
        </label>
        <input
          id='inputId'
          type='text'
          placeholder='Search or start a new chat'
          value={query}
          onChange={handleInputChange}
          className='pl-3 flex-1 bg-gray-700 focus:outline-none placeholder:text-sm placeholder:text-gray-400 font-poppins text-sm'
        />
        {filteredOptions.length > 0 && (
          <ul className='absolute top-full left-0 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10'>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className='p-2 cursor-pointer hover:bg-gray-600'
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
