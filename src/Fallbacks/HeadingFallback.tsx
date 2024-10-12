import { memo } from 'react';

const HeadingFallback = memo(() => {
  return (
    <div className='sticky flex items-center justify-between py-3 px-6 border-gray-600 bg-[#32383b]'>
      <div className='flex items-center'>
        <h1 data-testid='heading-fallback' className='font-poppins text-lg'>
          Loading heading...
        </h1>
      </div>
    </div>
  );
});

export default HeadingFallback;
