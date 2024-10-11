import { render, screen } from '@testing-library/react';
import DeliveredMessageFallback from '../DeliveredMessageFallback';

describe('DeliveredMessageFallback', () => {
  it('renders the "No Messages Yet" message', () => {
    render(<DeliveredMessageFallback />);

    expect(screen.getByText('No Messages Yet')).toBeInTheDocument();
  });
});
