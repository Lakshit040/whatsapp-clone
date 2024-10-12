import { memo } from 'react';

const AddMessageFallback = memo(() => {
  return (
    <div className='w-full p-5 border-t-[0.5px] border-gray-600'>
      <form className='relative flex space-x-2 w-full'>
        <textarea
          data-testid='add-fallback'
          className='flex-1 p-3 border border-gray-600 rounded-lg focus:outline-none resize-none placeholder:text-gray-500 font-poppins text-gray-300'
          placeholder='Type a message here...'
        />
        <button
          data-testid='send-btn'
          type='submit'
          className='absolute right-3.5 top-3.5 bg-blue-500 text-gray-300 hover:text-white p-3 rounded-full flex items-center justify-center gap-2 font-poppins'
          title='Send message'
        >
          Send
        </button>
      </form>
    </div>
  );
});

export default AddMessageFallback;
