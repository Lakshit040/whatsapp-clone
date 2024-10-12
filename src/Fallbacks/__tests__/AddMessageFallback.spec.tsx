import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMessageFallback from '../AddMessageFallback';

describe('AddMessageFallback', () => {
  it('renders the textarea and send button', () => {
    render(<AddMessageFallback />);

    expect(screen.getByTestId('add-fallback')).toBeInTheDocument();

    expect(screen.getByTestId('send-btn')).toBeInTheDocument();
  });

  it('allows text to be typed in the textarea', async () => {
    render(<AddMessageFallback />);

    const textarea = screen.getByTestId('add-fallback');

    await userEvent.type(textarea, 'Hello World');

    expect(textarea).toHaveValue('Hello World');
  });
});
