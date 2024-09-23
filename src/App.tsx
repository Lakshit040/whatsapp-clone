import ContactsPanel from './ContactsPanel';
import ContextProviderWrapper from './ContextProviderWrapper';
import MessagePanel from './MessagePanel';

const App = () => {
  return (
    <ContextProviderWrapper>
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
    </ContextProviderWrapper>
  );
};

export default App;
