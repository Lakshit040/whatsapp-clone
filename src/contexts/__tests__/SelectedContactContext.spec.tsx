import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  SelectedContactProvider,
  useSelectedContact,
} from '../SelectedContactContext';
import { Contact } from '../../types';

const TestComponent = () => {
  const { selectedContact, setSelectedContact } = useSelectedContact();

  return (
    <div>
      <span data-testid='selected-contact'>
        {selectedContact ? selectedContact.name : 'No contact selected'}
      </span>
      <button
        data-testid='select-contact'
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
  it('should provide default context values', () => {
    render(
      <SelectedContactProvider>
        <TestComponent />
      </SelectedContactProvider>
    );

    expect(screen.getByTestId('selected-contact')).toHaveTextContent(
      'No contact selected'
    );
  });

  it('should set selected contact', async () => {
    render(
      <SelectedContactProvider>
        <TestComponent />
      </SelectedContactProvider>
    );

    await userEvent.click(screen.getByTestId('select-contact'));

    expect(screen.getByTestId('selected-contact')).toHaveTextContent(
      'John Doe'
    );
  });
});
