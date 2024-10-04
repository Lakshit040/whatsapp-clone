import { render, screen } from '@testing-library/react';
import HeadingFallback from '../../Fallbacks/HeadingFallback';

describe('HeadingFallback', () => {
  test('renders the "Loading heading..." text', () => {
    render(<HeadingFallback />);

    const headingElement = screen.getByText('Loading heading...');
    expect(headingElement).toBeInTheDocument();

    expect(headingElement).toHaveClass('font-poppins text-lg');
  });

  test('has the correct container structure', () => {
    const { container } = render(<HeadingFallback />);

    expect(container.firstChild).toHaveClass(
      'sticky flex items-center justify-between py-3 px-6 border-gray-600 bg-[#32383b]'
    );
    expect(container.querySelector('.flex.items-center')).toBeInTheDocument();
  });
});
