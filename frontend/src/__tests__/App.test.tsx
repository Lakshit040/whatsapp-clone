import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../ContactsPanel', () => jest.fn(() => <div>Contacts Panel</div>));
jest.mock('../MessagePanel', () => jest.fn(() => <div>Message Panel</div>));

describe('App Component', () => {
  test('renders ContactsPanel and MessagePanel', () => {
    render(<App />);

    const contactsPanel = screen.getByText('Contacts Panel');
    expect(contactsPanel).toBeInTheDocument();

    const messagePanel = screen.getByText('Message Panel');
    expect(messagePanel).toBeInTheDocument();
  });

  test('renders the layout with the correct class names', () => {
    render(<App />);

    const layoutDiv = screen.getByRole('main', { hidden: true });
    expect(layoutDiv).toHaveClass('min-w-screen min-h-screen');

    const flexDiv = layoutDiv.querySelector('.flex');
    expect(flexDiv).toBeInTheDocument();

    const contactsDiv = flexDiv?.querySelector('.sm\\:w-\\[40\\%\\]');
    expect(contactsDiv).toBeInTheDocument();

    const messageDiv = flexDiv?.querySelector('.sm\\:w-\\[60\\%\\]');
    expect(messageDiv).toHaveClass('border-l-[.5px] border-white/20');
  });
});
