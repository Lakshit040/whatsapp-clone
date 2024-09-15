import ContactsPanel from './ContactsPanel/ContactsPanel';
import MessagePanel from './MessagePanel/MessagePanel';

import { MessagesProvider } from './contexts/MessagesContext';
import { ContactsProvider } from './contexts/ContactsContext';
import { SelectedContactProvider } from './contexts/SelectedContactContext';
import { ModeProvider } from './contexts/ModeContext';

const App = () => {
  return (
    <MessagesProvider>
      <ContactsProvider>
        <SelectedContactProvider>
          <ModeProvider>
            <div className='min-w-screen min-h-screen'>
              <div className='flex'>
                <div className='sm:w-[40%] lg:w-[25%] h-screen overflow-hidden'>
                  <ContactsPanel />
                </div>
                <div className='sm:w-[60%] lg:w-[75%] border-l-[.5px] border-white/20 h-screen'>
                  <MessagePanel />
                </div>
              </div>
            </div>
          </ModeProvider>
        </SelectedContactProvider>
      </ContactsProvider>
    </MessagesProvider>
  );
};

export default App;
