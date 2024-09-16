import { memo, useEffect } from 'react';
import { useMode } from '../contexts/ModeContext';

import { FaCircleUser, FaMessage } from 'react-icons/fa6';
import { PiCircleDashed } from 'react-icons/pi';
import { HiDotsVertical } from 'react-icons/hi';
import { FiMaximize, FiMinimize } from 'react-icons/fi';

import { Mode } from '../utils';

const ProfileArea = memo(() => {
  const { mode, toggleMode } = useMode();
  useEffect(() => {
    console.log('Rendered ProfileArea');
  });
  return (
    <div className='container mx-auto bg-[#32383b]'>
      <div className='px-5 py-4 flex justify-between items-center'>
        <FaCircleUser
          className='w-8 h-8 cursor-pointer hover:text-white'
          title='Profile'
        />
        <div className='flex gap-8'>
          {mode === Mode.Compact ? (
            <FiMaximize
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Spacious Mode'
              onClick={toggleMode}
            />
          ) : (
            <FiMinimize
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Compact Mode'
              onClick={toggleMode}
            />
          )}
          <PiCircleDashed
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Status'
          />
          <FaMessage
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Send Message'
          />
          <HiDotsVertical
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Options'
          />
        </div>
      </div>
    </div>
  );
});

export default ProfileArea;
