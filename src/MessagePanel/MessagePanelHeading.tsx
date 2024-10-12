import { memo } from 'react';

import { SearchButton, CloseButton } from '../icons';
import { PROFILE_IMG } from '../utils';

interface MessagePanelHeadingProps {
  name: string;
  onChatClose: () => void;
}

const MessagePanelHeading = memo(
  ({ name, onChatClose }: MessagePanelHeadingProps) => {
    return (
      <div
        className='sticky flex items-center justify-between py-3 px-6 border-gray-600 bg-[#32383b]'
        title={name}
      >
        <div className='flex items-center'>
          <div className='w-14 h-14 rounded-full overflow-hidden cursor-pointer'>
            <img
              src={PROFILE_IMG}
              alt={name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='ml-4 flex'>
            <span data-testid='contact-name' className='text-lg font-poppins'>
              {name}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <SearchButton
            data-testid='search-btn'
            className='w-6 h-6 text-gray-400 hover:text-white cursor-pointer'
            title='Search a message'
          />

          <CloseButton
            data-testid='close-btn'
            className='w-6 h-6 text-gray-400 hover:text-white cursor-pointer'
            title='Close Chat'
            onClick={onChatClose}
          />
        </div>
      </div>
    );
  }
);

export default MessagePanelHeading;
