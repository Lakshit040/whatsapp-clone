import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react';
import { ModeProvider, useMode } from '../../contexts/ModeContext';
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
  test('renders children correctly', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    expect(screen.getByTestId('mode-text')).toBeInTheDocument();
  });

  test('default mode is Spacious', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    );

    expect(screen.getByTestId('mode-text')).toHaveTextContent(Mode.Spacious);
  });

  test('toggles mode between Spacious and Compact', () => {
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

describe('useMode', () => {
  test('provides the correct initial mode when used within ModeProvider', () => {
    const { result } = renderHook(() => useMode(), {
      wrapper: ModeProvider,
    });

    expect(result.current.mode).toBe(Mode.Spacious);
  });

  test('toggles mode correctly', () => {
    const { result } = renderHook(() => useMode(), {
      wrapper: ModeProvider,
    });

    expect(result.current.mode).toBe(Mode.Spacious);

    act(() => {
      result.current.toggleMode();
    });

    expect(result.current.mode).toBe(Mode.Compact);

    act(() => {
      result.current.toggleMode();
    });

    expect(result.current.mode).toBe(Mode.Spacious);
  });
});
