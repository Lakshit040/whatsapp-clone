import { render, screen } from '@testing-library/react';
import ProfileArea from '../ProfileArea';
import { useMode } from '../../contexts/ModeContext';
import { Mode } from '../../types';
import userEvent from '@testing-library/user-event';

jest.mock('../../contexts/ModeContext', () => ({
  useMode: jest.fn(),
}));

describe('ProfileArea', () => {
  it('renders ProfileArea with Compact mode', () => {
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Compact,
      toggleMode: jest.fn(),
    });
    render(<ProfileArea />);

    expect(screen.getByTestId('user-btn')).toBeInTheDocument();
    expect(screen.getByTestId('expand-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('collapse-btn')).toBeNull();
    expect(screen.getByTestId('status-btn')).toBeInTheDocument();
    expect(screen.getByTestId('message-btn')).toBeInTheDocument();
    expect(screen.getByTestId('option-btn')).toBeInTheDocument();
  });

  it('renders ProfileArea with Spacious mode', () => {
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Spacious,
      toggleMode: jest.fn(),
    });
    render(<ProfileArea />);

    expect(screen.getByTestId('user-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('expand-btn')).toBeNull();
    expect(screen.getByTestId('collapse-btn')).toBeInTheDocument();
    expect(screen.getByTestId('status-btn')).toBeInTheDocument();
    expect(screen.getByTestId('message-btn')).toBeInTheDocument();
    expect(screen.getByTestId('option-btn')).toBeInTheDocument();
  });

  it('calls toggleMode when mode button is clicked', async () => {
    const toggleModeMock = jest.fn();
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Compact,
      toggleMode: toggleModeMock,
    });

    render(<ProfileArea />);

    await userEvent.click(screen.getByTestId('expand-btn'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });

  it('calls toggleMode when collapse button is clicked', async () => {
    const toggleModeMock = jest.fn();
    (useMode as jest.Mock).mockReturnValue({
      mode: Mode.Spacious,
      toggleMode: toggleModeMock,
    });

    render(<ProfileArea />);

    await userEvent.click(screen.getByTestId('collapse-btn'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });
});
