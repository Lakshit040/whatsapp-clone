import { ReactNode, useCallback, useState, memo } from 'react';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import {
  headingGenerator,
  labelGenerator,
  ModalActionType,
  OnConfirm,
} from '../utils';

interface ModalProps {
  actionType: ModalActionType;
  onConfirm: OnConfirm;
  contactId?: string;
  messageId?: string;
  editedMessage?: string;
  children?: ReactNode;
}

const Modal = memo(
  ({
    actionType,
    contactId,
    messageId,
    editedMessage,
    onConfirm,
    children,
  }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState(editedMessage ?? '');

    const heading = headingGenerator(actionType);
    const label = labelGenerator(actionType);

    const onToggle = useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpen((open) => !open);
    }, []);

    const onClose = useCallback(() => {
      setIsOpen((open) => !open);
    }, []);

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
      },
      []
    );

    const handleSave = useCallback(() => {
      onConfirm({
        type: actionType,
        state: {
          messageId,
          contactId,
          entry: input.trim(),
        },
      });
      setIsOpen((open) => !open);
    }, [input, contactId, messageId, onConfirm]);

    return (
      <>
        <Button
          onClick={onToggle}
          className='rounded-full bg-black shadow-2xl text-sm font-medium text-white focus:outline-none data-[hover]:bg-slate-950 data-[focus]:outline-none duration-300 ease-in-out data-[hover]:scale-110'
        >
          {children}
        </Button>

        <Dialog
          open={isOpen}
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={onClose}
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
                {label && (
                  <>
                    <p className='mt-2 text-sm/6 text-white/80'>{label}</p>
                    <Input
                      className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-none'
                      placeholder={`Enter ${label.toLowerCase()} here...`}
                      value={input}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <div className='mt-4 flex items-center justify-center gap-4'>
                  <Button
                    className={`inline-flex items-center gap-2 rounded-md ${
                      label
                        ? 'bg-[#17774c] data-[hover]:bg-[#13603d]'
                        : 'bg-[#771717] data-[hover]:bg-[#7f2e2e]'
                    } py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700`}
                    onClick={handleSave}
                  >
                    {label ? 'Save' : 'Delete'}
                  </Button>
                  <Button
                    className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                    onClick={onToggle}
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

export default Modal;
