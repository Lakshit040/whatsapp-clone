import { memo } from 'react';
import { useMode } from '../contexts/ModeContext';

import {
  UserButton,
  MessageButton,
  OptionButton,
  ExpandButton,
  CollapseButton,
  StatusButton,
} from '../icons';

import { Mode } from '../types';

const ProfileArea = memo(() => {
  const { mode, toggleMode } = useMode();

  return (
    <div className='container mx-auto bg-[#32383b]'>
      <div className='px-5 py-4 flex justify-between items-center'>
        <UserButton
          data-testid='user-btn'
          className='w-8 h-8 cursor-pointer hover:text-white'
          title='Profile'
        />
        <div className='flex gap-8'>
          {mode === Mode.Compact ? (
            <ExpandButton
              data-testid='expand-btn'
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Spacious Mode'
              onClick={toggleMode}
            />
          ) : (
            <CollapseButton
              data-testid='collapse-btn'
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
              title='Switch to Compact Mode'
              onClick={toggleMode}
            />
          )}
          <StatusButton
            data-testid='status-btn'
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Status'
          />
          <MessageButton
            data-testid='message-btn'
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Send Message'
          />
          <OptionButton
            data-testid='option-btn'
            className='w-6 h-6 text-gray-400 cursor-pointer hover:text-white'
            title='Options'
          />
        </div>
      </div>
    </div>
  );
});

export default ProfileArea;
