import { FaPlus } from 'react-icons/fa';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useCallback } from 'react';

const AddNewContact = () => {
  return (
    <button
      className='flex items-center justify-center rounded-full shadow-2xl border-[.5px] border-white/20 p-3 bg-[#2e23c9] hover:scale-110'
      title='Create new contact'
    >
      <FaPlus className='w-6 h-6 text-white' />
    </button>
  );
};

export default AddNewContact;
