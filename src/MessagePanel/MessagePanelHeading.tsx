import { memo, useEffect } from 'react';

import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

interface MessagePanelHeadingProps {
  name: string;
  profileImg: string;
  onChatClose: () => void;
  className?: string;
}

const MessagePanelHeading = memo(
  ({ name, profileImg, onChatClose, className }: MessagePanelHeadingProps) => {
    useEffect(() => {
      console.log('Rendered MessagePanelHeading with name, ', name);
    });

    return (
      <div
        className={`flex items-center justify-between py-3 px-6 border-gray-600 bg-[#32383b] ${className}`}
        title={name}
      >
        <div className='flex items-center'>
          <div className='w-14 h-14 rounded-full overflow-hidden cursor-pointer'>
            <img
              src={profileImg}
              alt={name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='ml-4 flex'>
            <span className='text-lg font-poppins'>{name}</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <IoSearch
            className='w-6 h-6 text-gray-400 hover:text-white cursor-pointer'
            title='Search a message'
          />

          <RxCross2
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
