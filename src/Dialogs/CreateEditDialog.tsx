import React, { memo, ReactNode, useCallback, useState } from 'react';
import Dialog from './Dialog';

interface CreateEditDialogProps {
  children: ReactNode;
  initialValue?: string;
  onConfirm: (value: string) => void;
}

const CreateEditDialog = memo(
  ({ children, onConfirm, initialValue }: CreateEditDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const [input, setInput] = useState(initialValue ?? '');

    const onToggle = useCallback(() => {
      setIsOpen((open) => !open);
    }, []);
    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
      },
      []
    );

    const handleSubmit = useCallback(
      (event: React.FormEvent) => {
        event.preventDefault();
        if (input.trim().length === 0) return;
        onConfirm(input.trim());
        setIsOpen((open) => !open);
        setInput('');
      },
      [input, onConfirm]
    );

    return (
      <>
        <button
          className='rounded-full bg-black/20 shadow-2xl text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white duration-300 ease-in-out data-[hover]:scale-110 data-[hover]:text-gray-300'
          onClick={onToggle}
        >
          {children}
        </button>
        <Dialog isOpen={isOpen} onClose={onToggle}>
          <Dialog.Header>
            {initialValue ? 'Edit your message' : 'Add new Contact'}
          </Dialog.Header>
          <form onSubmit={handleSubmit}>
            <Dialog.Body>
              <input
                className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-none'
                placeholder={
                  initialValue ? 'Enter message here' : 'Enter name here'
                }
                value={input}
                onChange={handleInputChange}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <button
                type='submit'
                className='inline-flex items-center gap-2 rounded-md bg-[#971d1d] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#8f0f0f] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
              >
                Save
              </button>
              <button
                onClick={onToggle}
                className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
              >
                Cancel
              </button>
            </Dialog.Footer>
          </form>
        </Dialog>
      </>
    );
  }
);

export default CreateEditDialog;
