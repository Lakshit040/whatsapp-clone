import { render, screen } from '@testing-library/react';
import DeliveredMessageFallback from '../../Fallbacks/DeliveredMessageFallback';

describe('DeliveredMessageFallback', () => {
  test('renders the "No Messages Yet" message', () => {
    render(<DeliveredMessageFallback />);

    const messageElement = screen.getByText('No Messages Yet');
    expect(messageElement).toBeInTheDocument();

    expect(messageElement).toHaveClass('text-xl font-poppins');
  });

  test('has the correct container structure', () => {
    const { container } = render(<DeliveredMessageFallback />);

    expect(container.firstChild).toHaveClass('container mx-auto h-full');
    expect(
      container.querySelector('.h-full.overflow-y-auto.p-4.pb-0')
    ).toBeInTheDocument();
  });
});
