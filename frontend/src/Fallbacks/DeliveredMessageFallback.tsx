import { memo } from 'react';

const DeliveredMessageFallback = memo(() => {
  return (
    <div className='container mx-auto h-full'>
      <div className='h-full overflow-y-auto p-4 pb-0'>
        <div className='flex justify-center items-center w-full h-full text-xl font-poppins'>
          No Messages Yet
        </div>
      </div>
    </div>
  );
});

export default DeliveredMessageFallback;
