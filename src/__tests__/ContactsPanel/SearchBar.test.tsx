import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../../ContactsPanel/SearchBar';
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
  test('renders the search input', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={jest.fn()} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Search or start a new chat')
    ).toBeInTheDocument();
  });

  test('filters contacts based on input', () => {
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

  test('calls onContactSelect when an option is clicked', () => {
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

  test('calls onContactSelect when the Enter key is pressed on a highlighted option', () => {
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

    fireEvent.keyDown(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        key: 'ArrowDown',
      }
    );

    fireEvent.keyDown(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        key: 'Enter',
      }
    );

    expect(onContactSelectMock).toHaveBeenCalledWith(mockContacts[0]);
  });

  test('does not call onContactSelect when Enter is pressed without options', () => {
    const onContactSelectMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchBar onContactSelect={onContactSelectMock} />
      </Provider>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Search or start a new chat'),
      {
        target: { value: 'Nonexistent' },
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
