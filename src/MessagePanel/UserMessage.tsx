import { memo } from 'react';
import { useMode } from '../contexts/ModeContext';

import { DeleteButton, EditButton } from '../icons';

import { ModalActionType, Mode, OnConfirm, timeFormatter } from '../utils';
import Modal from '../Modals/Modal';

interface UserMessageProps {
  contactId: string;
  messageId: string;
  text: string;
  timestamp: string;
  onMessageDelete: OnConfirm;
  onMessageEdit: OnConfirm;
}

const UserMessage = memo(
  ({
    contactId,
    messageId,
    text,
    timestamp,
    onMessageDelete,
    onMessageEdit,
  }: UserMessageProps) => {
    const { mode } = useMode();

    return (
      <div className='flex flex-row-reverse container py-2 relative'>
        <div className='flex items-center gap-2 shadow-xl border-[0.5px] border-gray-600 bg-green-700 rounded-lg py-2 px-3 group max-w-lg'>
          <span className='text-white font-poppins'>{text}</span>
          <div className='flex flex-col gap-3 items-end justify-between'>
            <div className='absolute hidden group-hover:block right-0 top-0'>
              <Modal
                actionType={ModalActionType.EditMessage}
                contactId={contactId}
                messageId={messageId}
                editedMessage={text}
                onConfirm={onMessageEdit}
              >
                <EditButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Edit Message'
                />
              </Modal>
            </div>
            <div className='absolute hidden group-hover:block right-7 top-0'>
              <Modal
                actionType={ModalActionType.DeleteMessage}
                contactId={contactId}
                messageId={messageId}
                onConfirm={onMessageDelete}
              >
                <DeleteButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Delete Message'
                />
              </Modal>
            </div>

            {mode === Mode.Spacious && (
              <span className='text-[10px] font-poppins'>
                {timeFormatter(timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default UserMessage;
