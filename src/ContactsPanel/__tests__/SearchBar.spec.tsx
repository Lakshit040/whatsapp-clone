import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../SearchBar';
import { Contact } from '../../types';
import reducer from '../../redux/reducer';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  const mockContacts: Contact[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
  ];

  const mockStore = configureStore({
    reducer,
    preloadedState: {
      contacts: {
        byId: {
          '1': { id: '1', name: 'John Doe' },
          '2': { id: '2', name: 'Jane Smith' },
          '3': { id: '3', name: 'Alice Johnson' },
        },
        allIds: ['1', '2', '3'],
        lastMessages: {},
      },
      messages: {
        byContactId: {},
      },
    },
  });

  it('renders the search element', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={jest.fn()} />
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('filter contacts based on the quuery passed', async () => {
    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={jest.fn()} />
      </Provider>
    );

    await userEvent.type(screen.getByTestId('search-input'), 'John');

    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.queryByTestId('2')).not.toBeInTheDocument();
  });

  it('calls onContactSelect when an option is clicked', async () => {
    const onContactSelectMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={onContactSelectMock} />
      </Provider>
    );

    await userEvent.type(screen.getByTestId('search-input'), 'John');

    await userEvent.click(screen.getByTestId('1'));

    expect(onContactSelectMock).toHaveBeenCalledWith(mockContacts[0]);
  });

  it('does not call onContactSelect when Enter is pressed without options', async () => {
    const onContactSelectMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={onContactSelectMock} />
      </Provider>
    );

    await userEvent.type(screen.getByTestId('search-input'), 'garbage');

    await userEvent.keyboard('[Enter]');

    expect(onContactSelectMock).not.toHaveBeenCalled();
  });
});
