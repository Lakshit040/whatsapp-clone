import { memo } from 'react';
import { useMode } from '../contexts/ModeContext';

import CreateEditModal from '../Modals/CreateEditModal';
import DeleteModal from '../Modals/DeleteModal';
import { DeleteButton, EditButton } from '../icons';

import { Mode, timeFormatter } from '../utils';

interface UserMessageProps {
  messageId: string;
  text: string;
  createdAt: string;
  onMessageDelete: (messageId: string) => void;
  onMessageEdit: (messageId: string, newText: string) => void;
}

const UserMessage = memo(
  ({
    messageId,
    text,
    createdAt,
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
              <CreateEditModal
                messageId={messageId}
                onMessageEdit={onMessageEdit}
                editedMessage={text}
              >
                <EditButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Edit Message'
                />
              </CreateEditModal>
            </div>
            <div className='absolute hidden group-hover:block right-7 top-0'>
              <DeleteModal
                isMessage={true}
                contentId={messageId}
                onDelete={onMessageDelete}
              >
                <DeleteButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Delete Message'
                />
              </DeleteModal>
            </div>

            {mode === Mode.Spacious && (
              <span className='text-[10px] font-poppins'>
                {timeFormatter(createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default UserMessage;
