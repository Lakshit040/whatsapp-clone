import { render, screen } from '@testing-library/react';
import { ModeProvider, useMode } from '../ModeContext';
import { Mode } from '../../types';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { mode, toggleMode } = useMode();

  return (
    <div>
      <span data-testid='mode-text'>{mode}</span>
      <button data-testid='toggle-btn' onClick={toggleMode}>
        Toggle Mode
      </button>
    </div>
  );
};

describe('ModeContext', () => {
  it('renders children correctly', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    expect(screen.getByTestId('mode-text')).toBeInTheDocument();
  });

  it('default mode is Spacious', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);
  });

  it('toggles mode between Spacious and Compact', async () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-btn');

    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);

    await userEvent.click(toggleButton);
    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Compact);

    await userEvent.click(toggleButton);
    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);
  });
});
