import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import DeliveredMessageComponent from '../DeliveredMessageComponent';
import reducer, {
  deleteMessage,
  editMessage,
  updateLastMessage,
} from '../../redux/reducer';
import { Message, Mode } from '../../types';
import { ModeContext } from '../../contexts/ModeContext';

const mockStore = (contactId: string, messages: Message[]) => {
  const store = configureStore({
    reducer,
    preloadedState: {
      contacts: {
        byId: {
          contactId: { id: '1', name: 'John Doe' },
        },
        allIds: [contactId],
        lastMessages: {},
      },
      messages: {
        byContactId: {
          [contactId]: messages,
        },
      },
    },
  });
  return store;
};

describe('DeliveredMessageComponent', () => {
  const contactId = 'contact_1';
  const mockMessages = [
    {
      id: 'msg_1',
      text: 'Hello',
      createdAt: new Date().toISOString(),
      contactId,
    },
    {
      id: 'msg_2',
      text: 'How are you?',
      createdAt: new Date().toISOString(),
      contactId,
    },
  ];

  const renderComponent = (messages: Message[]) => {
    const store = mockStore(contactId, messages);
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <ModeContext.Provider
          value={{ mode: Mode.Spacious, toggleMode: jest.fn() }}
        >
          <DeliveredMessageComponent contactId={contactId} />
        </ModeContext.Provider>
      </Provider>
    );
    return { spy };
  };

  it('renders messages correctly', () => {
    renderComponent(mockMessages);

    const msgs = screen.getAllByTestId('message-txt');

    expect(msgs[0]).toBeInTheDocument();
    expect(msgs[1]).toBeInTheDocument();
  });

  it('displays "No Messages Yet" when there are no messages', () => {
    renderComponent([]);

    expect(screen.getByTestId('no-msgs')).toBeInTheDocument();
  });

  it('dispatches deleteMessage and updateLastMessage when a message is deleted', async () => {
    const { spy } = renderComponent(mockMessages);

    await userEvent.click(screen.getAllByTestId('delete-btn')[1]);

    await userEvent.click(screen.getByTestId('confirm-btn'));

    expect(spy).toHaveBeenCalledWith(
      deleteMessage({ contactId, messageId: 'msg_2' })
    );

    expect(spy).toHaveBeenCalledWith(
      updateLastMessage({ contactId, message: mockMessages[0] })
    );
  });

  it('dispatches editMessage and updateLastMessage when a message is edited', async () => {
    const { spy } = renderComponent(mockMessages);

    await userEvent.click(screen.getAllByTestId('edit-btn')[1]);

    const input = screen.getByTestId('modal-input');
    await userEvent.clear(input);
    await userEvent.type(input, 'I am fine');

    await userEvent.click(screen.getByTestId('confirm-btn'));

    expect(spy).toHaveBeenCalledWith(
      editMessage({ contactId, messageId: 'msg_2', newText: 'I am fine' })
    );

    expect(spy).toHaveBeenCalledWith(
      updateLastMessage({
        contactId,
        message: {
          id: 'msg_2',
          createdAt: mockMessages[1].createdAt,
          text: 'I am fine',
          contactId,
        },
      })
    );
  });
});
