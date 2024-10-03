// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mocking the ContactsPanel and MessagePanel components if needed
jest.mock('../ContactsPanel', () => () => <div>Contacts Panel</div>);
jest.mock('../MessagePanel', () => () => <div>Message Panel</div>);

describe('App Component', () => {
  test('renders ContactsPanel and MessagePanel', () => {
    render(<App />);

    // Check if ContactsPanel is rendered
    const contactsPanel = screen.getByText('Contacts Panel');
    expect(contactsPanel).toBeInTheDocument();

    // Check if MessagePanel is rendered
    const messagePanel = screen.getByText('Message Panel');
    expect(messagePanel).toBeInTheDocument();
  });

  test('renders the layout with the correct class names', () => {
    render(<App />);

    // Check if the main layout div has the correct class
    const layoutDiv = screen.getByRole('main', { hidden: true });
    expect(layoutDiv).toHaveClass('min-w-screen min-h-screen');

    // Check if the flex container is rendered correctly
    const flexDiv = layoutDiv.querySelector('.flex');
    expect(flexDiv).toBeInTheDocument();

    // Check for the ContactsPanel div's width classes
    const contactsDiv = flexDiv?.querySelector('.sm\\:w-\\[40\\%\\]');
    expect(contactsDiv).toBeInTheDocument();

    // Check for the MessagePanel div's width and border classes
    const messageDiv = flexDiv?.querySelector('.sm\\:w-\\[60\\%\\]');
    expect(messageDiv).toHaveClass('border-l-[.5px] border-white/20');
  });
});
