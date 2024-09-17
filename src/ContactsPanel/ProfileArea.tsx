import { memo } from 'react';
import useMode from '../customHooks/useMode';

import {
  UserButton,
  MessageButton,
  OptionButton,
  ExpandButton,
  CollapseButton,
  StatusButton,
} from '../icons';

import { Mode } from '../utils';

const ProfileArea = memo(() => {
  const { mode, toggleMode } = useMode();

  return (
    <div className='container mx-auto bg-[#32383b]'>
      <div className='px-5 py-4 flex justify-between items-center'>
        <UserButton
          className='w-8 h-8 cursor-pointer hover:text-white'
          title='Profile'
        />
        <div className='flex gap-8'>
          {mode === Mode.Compact ? (
            <ExpandButton
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Spacious Mode'
              onClick={toggleMode}
            />
          ) : (
            <CollapseButton
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Compact Mode'
              onClick={toggleMode}
            />
          )}
          <StatusButton
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Status'
          />
          <MessageButton
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Send Message'
          />
          <OptionButton
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Options'
          />
        </div>
      </div>
    </div>
  );
});

export default ProfileArea;
