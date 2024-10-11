import { render, screen, fireEvent } from '@testing-library/react';
import AddMessageFallback from '../AddMessageFallback';

describe('AddMessageFallback', () => {
  it('renders the textarea and send button', () => {
    render(<AddMessageFallback />);

    expect(
      screen.getByPlaceholderText('Type a message here...')
    ).toBeInTheDocument();

    expect(screen.getByTitle('Send message')).toBeInTheDocument();
  });

  it('allows text to be typed in the textarea', () => {
    render(<AddMessageFallback />);

    const textarea = screen.getByPlaceholderText('Type a message here...');

    fireEvent.change(textarea, { target: { value: 'Hello World' } });

    expect(textarea).toHaveValue('Hello World');
  });
});
