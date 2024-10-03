import { render, screen } from '@testing-library/react';
import ImportContacts from '../../ContactsPanel/ImportContacts';

jest.mock('../../icons', () => ({
  WifiButton: (props: any) => <div data-testid='wifi-button' {...props} />,
  CloseButton: (props: any) => <div data-testid='close-button' {...props} />,
}));

describe('ImportContacts', () => {
  test('renders ImportContacts component', () => {
    render(<ImportContacts />);

    expect(screen.getByText('No Contacts')).toBeInTheDocument();
    expect(
      screen.getByText(/You can import contacts from Google/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Learn more/i)).toBeInTheDocument();
    expect(screen.getByTestId('wifi-button')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  test('contains correct class names and structure', () => {
    const { container } = render(<ImportContacts />);

    expect(container.firstChild).toHaveClass('container');
    expect(container.firstChild).toHaveClass('mx-auto');
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('bg-[#2e23c9]');
    expect(container.firstChild).toHaveClass('bg-opacity-80');
    expect(container.firstChild).toHaveClass('relative');
  });
});
