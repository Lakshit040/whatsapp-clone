import { useState } from 'react';
import Snackbar from './Snackbar';
import { SnackBarType } from './types';

const SnackBarTester = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <button
        onClick={showSnackbar}
        className='bg-blue-600 text-white px-4 py-2 rounded-md'
      >
        Show Snackbar
      </button>

      <Snackbar
        type={SnackBarType.Warning}
        message='Hi, how are you doing?'
        isOpen={snackbarOpen}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default SnackBarTester;
