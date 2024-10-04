import { render, screen, act } from '@testing-library/react';

import {
  SelectedContactProvider,
  useSelectedContact,
} from '../../contexts/SelectedContactContext';
import { Contact } from '../../types';

const TestComponent = () => {
  const { selectedContact, setSelectedContact } = useSelectedContact();

  return (
    <div>
      <span data-testid='selected-contact'>
        {selectedContact ? selectedContact.name : 'No contact selected'}
      </span>
      <button
        onClick={() =>
          setSelectedContact({ id: '1', name: 'John Doe' } as Contact)
        }
      >
        Select John Doe
      </button>
    </div>
  );
};

describe('SelectedContactContext', () => {
  test('should provide default context values', () => {
    render(
      <SelectedContactProvider>
        <TestComponent />
      </SelectedContactProvider>
    );

    expect(screen.getByTestId('selected-contact')).toHaveTextContent(
      'No contact selected'
    );
  });

  test('should set selected contact', () => {
    render(
      <SelectedContactProvider>
        <TestComponent />
      </SelectedContactProvider>
    );

    act(() => {
      screen.getByText('Select John Doe').click();
    });

    expect(screen.getByTestId('selected-contact')).toHaveTextContent(
      'John Doe'
    );
  });
});
