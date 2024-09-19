import { ReactNode, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalChildProps {
  children: ReactNode;
  className?: string;
}

const Dialog = ({ children, isOpen, onClose }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className='fixed inset-0 z-10 w-screen overflow-y-auto'
      onClick={handleClickOutside}
    >
      <div className='flex min-h-full items-center justify-center p-4'>
        <div
          ref={dialogRef}
          className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = ({ children, className }: ModalChildProps) => {
  return (
    <h3
      className={`text-base/7 font-medium text-white text-center ${className}`}
    >
      {children}
    </h3>
  );
};
const Body = ({ children }: ModalChildProps) => {
  return <>{children}</>;
};
const Footer = ({ children }: ModalChildProps) => {
  return (
    <div className='mt-4 flex items-center justify-center gap-4'>
      {children}
    </div>
  );
};

Dialog.Header = Header;
Dialog.Footer = Footer;
Dialog.Body = Body;

export default Dialog;
