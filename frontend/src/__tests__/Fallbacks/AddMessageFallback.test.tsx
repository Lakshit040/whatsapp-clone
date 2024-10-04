import { render, screen, fireEvent } from '@testing-library/react';
import AddMessageFallback from '../../Fallbacks/AddMessageFallback';

describe('AddMessageFallback', () => {
  test('renders the textarea and send button', () => {
    render(<AddMessageFallback />);

    const textarea = screen.getByPlaceholderText('Type a message here...');
    expect(textarea).toBeInTheDocument();

    const sendButton = screen.getByTitle('Send message');
    expect(sendButton).toBeInTheDocument();
  });

  test('allows text to be typed in the textarea', () => {
    render(<AddMessageFallback />);

    const textarea = screen.getByPlaceholderText('Type a message here...');

    fireEvent.change(textarea, { target: { value: 'Hello World' } });

    expect(textarea).toHaveValue('Hello World');
  });

  test('submits the form when send button is clicked', () => {
    render(<AddMessageFallback />);

    const textarea = screen.getByPlaceholderText('Type a message here...');

    fireEvent.change(textarea, { target: { value: 'Hello World' } });

    expect(textarea).toHaveValue('Hello World');
  });
});
