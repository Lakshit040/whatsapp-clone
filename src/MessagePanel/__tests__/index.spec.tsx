import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectedContactContext } from '../../contexts/SelectedContactContext';
import MessagePanel from '..';
import { Contact, RootState } from '../../types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../redux/reducer';

describe('MessagePanel', () => {
  const mockContact: Contact = {
    id: '1',
    name: 'John Doe',
  };
  const setSelectedContactMock = jest.fn();
  const initialState: RootState = {
    contacts: {
      byId: {
        ['1']: mockContact,
      },
      allIds: ['1'],
      lastMessages: {},
    },
    messages: {
      byContactId: {
        ['1']: [],
      },
    },
  };

  const renderWithProviders = (
    initalState: RootState,
    contact: Contact | null
  ) => {
    const store = configureStore({ reducer, preloadedState: initalState });
    render(
      <Provider store={store}>
        <SelectedContactContext.Provider
          value={{
            selectedContact: contact,
            setSelectedContact: setSelectedContactMock,
          }}
        >
          <MessagePanel />
        </SelectedContactContext.Provider>
      </Provider>
    );
  };

  it('renders default message panel', () => {
    renderWithProviders(initialState, null);

    expect(screen.getByTestId('default-msg-panel')).toBeInTheDocument();
  });

  it('renders lazy-loaded components when contact is selected', async () => {
    renderWithProviders(initialState, mockContact);

    expect(screen.getByTestId('heading-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('delivered-fallback')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('contact-name')).toBeInTheDocument();
      expect(screen.getByTestId('delivered-msg-component')).toBeInTheDocument();
      expect(screen.getByTestId('add-msg-component')).toBeInTheDocument();
    });
  });

  it('calls setSelectedContact with null when chat is closed', async () => {
    renderWithProviders(initialState, mockContact);

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(setSelectedContactMock).toHaveBeenCalledWith(null);
  });
});
