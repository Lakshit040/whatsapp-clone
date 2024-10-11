import { render, screen, fireEvent } from '@testing-library/react';
import ProfileArea from '../ProfileArea';
import { useMode } from '../../contexts/ModeContext';
import { Mode } from '../../types';

jest.mock('../../contexts/ModeContext', () => ({
  useMode: jest.fn(),
}));

jest.mock('../../icons', () => ({
  UserButton: (props: any) => <div data-testid='user-button' {...props} />,
  MessageButton: (props: any) => (
    <div data-testid='message-button' {...props} />
  ),
  OptionButton: (props: any) => <div data-testid='option-button' {...props} />,
  ExpandButton: (props: any) => <div data-testid='expand-button' {...props} />,
  CollapseButton: (props: any) => (
    <div data-testid='collapse-button' {...props} />
  ),
  StatusButton: (props: any) => <div data-testid='status-button' {...props} />,
}));

describe('ProfileArea', () => {
  (useMode as jest.Mock).mockReturnValue({
    mode: Mode.Compact,
    toggleMode: jest.fn(),
  });

  it('renders ProfileArea with Compact mode', () => {
    render(<ProfileArea />);

    expect(screen.getByTestId('user-button')).toBeInTheDocument();
    expect(screen.getByTestId('expand-button')).toBeInTheDocument();
    expect(screen.queryByTestId('collapse-button')).toBeNull();
    expect(screen.getByTestId('status-button')).toBeInTheDocument();
    expect(screen.getByTestId('message-button')).toBeInTheDocument();
    expect(screen.getByTestId('option-button')).toBeInTheDocument();
  });

  it('renders ProfileArea with Spacious mode', () => {
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Spacious,
      toggleMode: jest.fn(),
    });

    render(<ProfileArea />);

    expect(screen.getByTestId('user-button')).toBeInTheDocument();
    expect(screen.queryByTestId('expand-button')).toBeNull();
    expect(screen.getByTestId('collapse-button')).toBeInTheDocument();
    expect(screen.getByTestId('status-button')).toBeInTheDocument();
    expect(screen.getByTestId('message-button')).toBeInTheDocument();
    expect(screen.getByTestId('option-button')).toBeInTheDocument();
  });

  it('calls toggleMode when mode button is clicked', () => {
    const toggleModeMock = jest.fn();
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Compact,
      toggleMode: toggleModeMock,
    });

    render(<ProfileArea />);

    fireEvent.click(screen.getByTestId('expand-button'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });

  it('calls toggleMode when collapse button is clicked', () => {
    const toggleModeMock = jest.fn();
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Spacious,
      toggleMode: toggleModeMock,
    });

    render(<ProfileArea />);

    fireEvent.click(screen.getByTestId('collapse-button'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });
});
