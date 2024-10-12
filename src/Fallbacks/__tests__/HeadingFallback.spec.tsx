import { render, screen } from '@testing-library/react';
import HeadingFallback from '../HeadingFallback';

describe('HeadingFallback', () => {
  it('renders the fallback heading component', () => {
    render(<HeadingFallback />);

    expect(screen.getByTestId('heading-fallback')).toBeInTheDocument();
  });
});
