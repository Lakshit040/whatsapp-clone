import { memo, useCallback } from 'react';
import { useMode } from '../contexts/ModeContext';

import { DeleteButton, EditButton } from '../icons';

import { timeFormatter } from '../utils';
import { Mode } from '../types';
import DeleteDialog from '../Dialogs/DeleteDialog';
import CreateEditDialog from '../Dialogs/CreateEditDialog';

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

    const handleMessageEdit = useCallback(
      (value: string) => {
        onMessageEdit(messageId, value);
      },
      [messageId, onMessageEdit]
    );

    return (
      <div className='flex flex-row-reverse container py-2 relative'>
        <div className='flex items-center gap-2 shadow-xl border-[0.5px] border-gray-600 bg-green-700 rounded-lg py-2 px-3 group max-w-lg'>
          <span className='text-white font-poppins'>{text}</span>
          <div className='flex flex-col gap-3 items-end justify-between'>
            <div className='absolute hidden group-hover:block right-0 top-0'>
              <CreateEditDialog
                onConfirm={handleMessageEdit}
                initialValue={text}
              >
                <EditButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Edit Message'
                />
              </CreateEditDialog>
            </div>
            <div className='absolute hidden group-hover:block right-7 top-0'>
              <DeleteDialog contentId={messageId} onDelete={onMessageDelete}>
                <DeleteButton
                  className='w-4 h-4 text-gray-400 font-semibold hover:scale-110 rounded-full m-1'
                  title='Delete Message'
                />
              </DeleteDialog>
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
