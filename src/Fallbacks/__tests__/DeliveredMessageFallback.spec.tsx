import { render, screen } from '@testing-library/react';
import DeliveredMessageFallback from '../DeliveredMessageFallback';

describe('DeliveredMessageFallback', () => {
  it('renders the delivered fallback component', () => {
    render(<DeliveredMessageFallback />);

    expect(screen.getByTestId('delivered-fallback')).toBeInTheDocument();
  });
});
