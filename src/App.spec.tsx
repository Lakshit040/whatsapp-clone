import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./ContactsPanel', () => jest.fn(() => <div>Contacts Panel</div>));
jest.mock('./MessagePanel', () => jest.fn(() => <div>Message Panel</div>));

describe('App Component', () => {
  it('renders ContactsPanel and MessagePanel', () => {
    render(<App />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    const contactsPanel = screen.getByText('Contacts Panel');
    expect(contactsPanel).toBeInTheDocument();

    const messagePanel = screen.getByText('Message Panel');
    expect(messagePanel).toBeInTheDocument();
  });
});
