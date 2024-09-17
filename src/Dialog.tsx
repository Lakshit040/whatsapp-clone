import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface DialogChildProps {
  children: ReactNode;
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg'>
        <button
          className='absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600'
          onClick={onClose}
        >
          <span className='sr-only'>Close</span>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const Header = ({ children }: DialogChildProps) => (
  <div className='mb-4 text-lg font-semibold'>{children}</div>
);

const Body = ({ children }: DialogChildProps) => (
  <div className='mb-4'>{children}</div>
);

const Footer = ({ children }: DialogChildProps) => (
  <div className='mt-4 flex justify-end space-x-2'>{children}</div>
);

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Footer = Footer;

export default Dialog;
