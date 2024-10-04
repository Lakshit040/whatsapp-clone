import { memo } from 'react';
import { WifiButton, CloseButton } from '../icons';

const ImportContacts = memo(() => {
  return (
    <div className='container mx-auto p-5 bg-[#2e23c9] bg-opacity-80 relative'>
      <div className='flex gap-1'>
        <div className='rounded-full bg-white flex justify-center items-center w-[45px] h-[45px]'>
          <WifiButton className='text-blue-700 w-6 h-6' />
        </div>
        <div className='pl-2'>
          <span className='text-xl font-poppins'>No Contacts</span>
          <p className='text-sm text-white/60 font-roboto'>
            You can import contacts from Google.{' '}
            <span className='underline cursor-pointer'>Learn more</span>
          </p>
        </div>
      </div>
      <div className='absolute top-3 right-3' title='Close'>
        <CloseButton className='w-5 h-5 cursor-pointer' />
      </div>
    </div>
  );
});

export default ImportContacts;
