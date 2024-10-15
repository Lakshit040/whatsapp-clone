import { render, screen } from '@testing-library/react';
import ProfileArea from '../ProfileArea';
import { ModeContext } from '../../contexts/ModeContext';
import { Mode } from '../../types';
import userEvent from '@testing-library/user-event';

describe('ProfileArea', () => {
  const toggleModeMock = jest.fn();

  it('renders ProfileArea with Compact mode', () => {
    render(
      <ModeContext.Provider
        value={{ mode: Mode.Compact, toggleMode: toggleModeMock }}
      >
        <ProfileArea />
      </ModeContext.Provider>
    );

    expect(screen.getByTestId('user-btn')).toBeInTheDocument();
    expect(screen.getByTestId('expand-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('collapse-btn')).toBeNull();
    expect(screen.getByTestId('status-btn')).toBeInTheDocument();
    expect(screen.getByTestId('message-btn')).toBeInTheDocument();
    expect(screen.getByTestId('option-btn')).toBeInTheDocument();
  });

  it('renders ProfileArea with Spacious mode', () => {
    render(
      <ModeContext.Provider
        value={{ mode: Mode.Spacious, toggleMode: toggleModeMock }}
      >
        <ProfileArea />
      </ModeContext.Provider>
    );

    expect(screen.getByTestId('user-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('expand-btn')).toBeNull();
    expect(screen.getByTestId('collapse-btn')).toBeInTheDocument();
    expect(screen.getByTestId('status-btn')).toBeInTheDocument();
    expect(screen.getByTestId('message-btn')).toBeInTheDocument();
    expect(screen.getByTestId('option-btn')).toBeInTheDocument();
  });

  it('calls toggleMode when expand button is clicked', async () => {
    render(
      <ModeContext.Provider
        value={{ mode: Mode.Compact, toggleMode: toggleModeMock }}
      >
        <ProfileArea />
      </ModeContext.Provider>
    );

    await userEvent.click(screen.getByTestId('expand-btn'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });

  it('calls toggleMode when collapse button is clicked', async () => {
    render(
      <ModeContext.Provider
        value={{ mode: Mode.Spacious, toggleMode: toggleModeMock }}
      >
        <ProfileArea />
      </ModeContext.Provider>
    );

    await userEvent.click(screen.getByTestId('collapse-btn'));
    expect(toggleModeMock).toHaveBeenCalledTimes(1);
  });
});
