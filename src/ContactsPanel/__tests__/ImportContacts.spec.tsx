import { render, screen } from '@testing-library/react';
import ImportContacts from '../ImportContacts';

jest.mock('../../icons', () => ({
  WifiButton: (props: any) => <div data-testid='wifi-button' {...props} />,
  CloseButton: (props: any) => <div data-testid='close-button' {...props} />,
}));

describe('ImportContacts', () => {
  it('renders ImportContacts component', () => {
    render(<ImportContacts />);

    expect(screen.getByText('No Contacts')).toBeInTheDocument();
    expect(
      screen.getByText(/You can import contacts from Google/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();

    expect(screen.getByTestId('wifi-button')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
});
