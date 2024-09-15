import { ReactNode, useCallback, useState, memo, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import { PROFILE_IMG } from '../constants';

interface CreateEditModalProps {
  contactId?: string;
  messageId?: string;
  editedMessage?: string;
  onContactSave?: (name: string, profileImg: string) => void;
  onMessageEdit?: (messageId: string, message: string) => void;
  children?: ReactNode;
}

const CreateEditModal = memo(
  ({
    contactId,
    messageId,
    editedMessage,
    onContactSave,
    onMessageEdit,
    children,
  }: CreateEditModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState(editedMessage ?? '');

    const heading = messageId ? 'Edit your message :' : 'Create new Contact :';
    const name = messageId ? 'Edited message' : 'Contact name';

    useEffect(() => {
      console.log('Rendered CreateEditModal');
    });

    const handleModalOpenClose = useCallback(() => {
      setIsOpen((open) => !open);
    }, []);

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
      },
      []
    );

    const handleSave = useCallback(() => {
      if (
        input.trim().length === 0 ||
        (editedMessage && input === editedMessage)
      ) {
        setIsOpen((open) => !open);
        return;
      }

      messageId
        ? onMessageEdit?.(messageId, input)
        : onContactSave?.(input, PROFILE_IMG);

      setIsOpen((open) => !open);
    }, [input, onContactSave, onMessageEdit, setIsOpen, contactId, messageId]);

    return (
      <>
        <Button
          onClick={handleModalOpenClose}
          className='rounded-full bg-black/20 shadow-2xl text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white duration-300 ease-in-out data-[hover]:scale-110'
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
                className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
              >
                <DialogTitle
                  as='h3'
                  className='text-base/7 font-medium text-white text-center'
                >
                  {heading}
                </DialogTitle>
                <p className='mt-2 text-sm/6 text-white/80'>{name}</p>
                <Input
                  className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-none'
                  placeholder={`Enter contact's name here...`}
                  value={input}
                  onChange={handleInputChange}
                />
                <div className='mt-4 flex items-center justify-center gap-4'>
                  <Button
                    className='inline-flex items-center gap-2 rounded-md bg-[#17774c] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#13603d] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                    onClick={handleSave}
                  >
                    Save
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

export default CreateEditModal;
