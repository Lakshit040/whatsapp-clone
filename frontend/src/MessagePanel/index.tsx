import { lazy, memo, Suspense, useCallback } from 'react';
import { useSelectedContact } from '../contexts/SelectedContactContext';
import HeadingFallback from '../Fallbacks/HeadingFallback';
import DeliveredMessageFallback from '../Fallbacks/DeliveredMessageFallback';
import AddMessageFallback from '../Fallbacks/AddMessageFallback';

const MessagePanelHeading = lazy(() => import('./MessagePanelHeading'));
const DeliveredMessageComponent = lazy(
  () => import('./DeliveredMessageComponent')
);
const AddMessageComponent = lazy(() => import('./AddMessageComponent'));

const MessagePanel = memo(() => {
  const { selectedContact, setSelectedContact } = useSelectedContact();

  const handleChatClose = useCallback(() => {
    setSelectedContact(null);
  }, []);

  if (selectedContact === null) {
    return (
      <span className='h-screen flex items-center justify-center font-poppins lg:text-2xl'>
        Select a conversation to get started!
      </span>
    );
  }

  return (
    <div className='container mx-auto relative h-screen bg-custom-bg bg-center bg-repeat flex flex-col'>
      <Suspense fallback={<HeadingFallback />}>
        <MessagePanelHeading
          name={selectedContact.name}
          onChatClose={handleChatClose}
        />
      </Suspense>
      <div className='flex-1 overflow-y-auto'>
        <Suspense fallback={<DeliveredMessageFallback />}>
          <DeliveredMessageComponent contactId={selectedContact.id} />
        </Suspense>
      </div>
      <div className='w-full sticky bottom-0'>
        <Suspense fallback={<AddMessageFallback />}>
          <AddMessageComponent contactId={selectedContact.id} />
        </Suspense>
      </div>
    </div>
  );
});

export default MessagePanel;
