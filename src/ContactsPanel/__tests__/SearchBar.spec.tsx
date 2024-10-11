import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../SearchBar';
import { Contact } from '../../types';
import reducer from '../../redux/reducer';

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

describe('SearchBar', () => {
  it('renders the search element', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={jest.fn()} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Search or start a new chat')
    ).toBeInTheDocument();
  });

  it('filter contacts based on the quuery passed', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={jest.fn()} />
      </Provider>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        target: { value: 'John' },
      }
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('calls onContactSelect when an option is clicked', () => {
    const onContactSelectMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={onContactSelectMock} />
      </Provider>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        target: { value: 'John' },
      }
    );

    fireEvent.click(screen.getByText('John Doe'));

    expect(onContactSelectMock).toHaveBeenCalledWith(mockContacts[0]);
  });

  it('does not call onContactSelect when Enter is pressed without options', () => {
    const onContactSelectMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={onContactSelectMock} />
      </Provider>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        target: { value: 'garbage' },
      }
    );

    fireEvent.keyDown(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        key: 'Enter',
      }
    );

    expect(onContactSelectMock).not.toHaveBeenCalled();
  });
});
