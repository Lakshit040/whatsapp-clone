import { memo, ReactNode, useCallback, useState } from 'react';
import Dialog from './Dialog';

interface DeleteDialogProps {
  children: ReactNode;
  contentId: string;
  onDelete: (contentId: string) => void;
}

const DeleteDialog = memo(
  ({ contentId, children, onDelete }: DeleteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = useCallback(() => {
      setIsOpen((open) => !open);
    }, []);

    const handleDelete = useCallback(() => {
      onDelete(contentId);
      setIsOpen((open) => !open);
    }, [onDelete]);

    return (
      <>
        <button
          className='rounded-full bg-black/20 shadow-2xl text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white duration-300 ease-in-out data-[hover]:scale-110 data-[hover]:text-gray-300'
          onClick={onToggle}
        >
          {children}
        </button>
        <Dialog isOpen={isOpen} onClose={onToggle}>
          <Dialog.Header>Are you sure?</Dialog.Header>
          <Dialog.Footer>
            <button
              onClick={handleDelete}
              className='inline-flex items-center gap-2 rounded-md bg-[#971d1d] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#8f0f0f] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
            >
              Delete
            </button>
            <button
              onClick={onToggle}
              className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
            >
              Cancel
            </button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  }
);

export default DeleteDialog;
