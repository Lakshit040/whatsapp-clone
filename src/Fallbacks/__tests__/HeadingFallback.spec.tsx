import { render, screen } from '@testing-library/react';
import HeadingFallback from '../HeadingFallback';

describe('HeadingFallback', () => {
  it('renders the "Loading heading..." text', () => {
    render(<HeadingFallback />);

    expect(screen.getByText('Loading heading...')).toBeInTheDocument();
  });
});
