import { memo, useCallback, useEffect } from 'react';
import { SnackBarType } from './types';
import { CloseButton } from './icons';

interface SnackBarProps {
  type: SnackBarType;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar = memo(
  ({ type, message, isOpen, onClose, duration = 3000 }: SnackBarProps) => {
    if (!isOpen) return null;

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (isOpen) {
        timer = setTimeout(() => {
          onClose();
        }, duration);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [isOpen, onClose, duration]);

    const textColor = useCallback(() => {
      switch (type) {
        case SnackBarType.Error:
          return 'text-error';
        case SnackBarType.Success:
          return 'text-success';
        case SnackBarType.Warning:
          return 'text-warning';
        default:
          return 'text-white';
      }
    }, [type]);

    return (
      <div
        className={`flex items-center gap-4 fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#28282B] rounded-md shadow-md p-4 ${textColor()}`}
      >
        {message}
        <button
          onClick={onClose}
          className='ml-4 text-white hover:text-gray-300'
        >
          <CloseButton className='w-5 h-5'/>
        </button>
      </div>
    );
  }
);

export default Snackbar;
