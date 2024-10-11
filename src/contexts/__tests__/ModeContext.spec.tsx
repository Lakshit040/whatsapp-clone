import { render, screen, fireEvent } from '@testing-library/react';
import { ModeProvider, useMode } from '../ModeContext';
import { Mode } from '../../types';

const TestComponent = () => {
  const { mode, toggleMode } = useMode();

  return (
    <div>
      <span data-testid='mode-text'>{mode}</span>
      <button onClick={toggleMode}>Toggle Mode</button>
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

  it('toggles mode between Spacious and Compact', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    const toggleButton = screen.getByText('Toggle Mode');

    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Compact);

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);
  });
});
