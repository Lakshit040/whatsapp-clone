import { ReactNode, useCallback, useState, memo, useEffect } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface DeleteModalProps {
  contactId?: string;
  messageId?: string;
  onDelete: (contactId: string, messageId: string) => void;
  children?: ReactNode;
}

const DeleteModal = memo(
  ({ contactId, messageId, onDelete, children }: DeleteModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const heading = messageId
      ? 'Delete this message ?'
      : 'Delete this contact ?';

    useEffect(() => {
      console.log('Rendered DeleteModal');
    });

    const handleModalOpenClose = useCallback(() => {
      setIsOpen((open) => !open);
    }, [setIsOpen]);

    const handleDelete = useCallback(() => {
      contactId && messageId && onDelete(contactId, messageId);
      setIsOpen((open) => !open);
    }, [onDelete, setIsOpen]);

    return (
      <>
        <Button
          onClick={handleModalOpenClose}
          className='rounded-full bg-black/20 shadow-2xl text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white duration-300 ease-in-out data-[hover]:scale-110 data-[hover]:text-gray-300'
        >
          {children}
        </Button>

        <Dialog
          open={isOpen}
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={handleModalOpenClose}
          __demoMode
        >
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <DialogPanel
                transition
                className='w-full max-w-xs rounded-xl bg-white/5 p-6 backdrop-blur-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
              >
                <DialogTitle
                  as='h3'
                  className='text-base/7 font-medium text-white text-center'
                >
                  {heading}
                </DialogTitle>
                <div className='mt-4 flex items-center justify-center gap-4'>
                  <Button
                    className='inline-flex items-center gap-2 rounded-md bg-[#971d1d] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#8f0f0f] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                    onClick={handleModalOpenClose}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
);

export default DeleteModal;
