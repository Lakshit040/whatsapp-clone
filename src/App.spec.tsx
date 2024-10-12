import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./ContactsPanel', () =>
  jest.fn(() => <div data-testid='contacts'>Contacts Panel</div>)
);
jest.mock('./MessagePanel', () =>
  jest.fn(() => <div data-testid='messages'>Message Panel</div>)
);

describe('App Component', () => {
  it('renders ContactsPanel and MessagePanel', () => {
    render(<App />);

    expect(screen.getByTestId('main')).toBeInTheDocument();

    expect(screen.getByTestId('contacts')).toBeInTheDocument();

    expect(screen.getByTestId('messages')).toBeInTheDocument();
  });
});
