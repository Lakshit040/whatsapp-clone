import { render, screen } from '@testing-library/react';
import ImportContacts from '../ImportContacts';

describe('ImportContacts', () => {
  it('renders ImportContacts component', () => {
    render(<ImportContacts />);

    expect(screen.getByTestId('no-contacts')).toBeInTheDocument();
    expect(screen.getByTestId('contacts-para')).toBeInTheDocument();
    expect(screen.getByTestId('learn-more')).toBeInTheDocument();
    expect(screen.getByTestId('wifi-btn')).toBeInTheDocument();
    expect(screen.getByTestId('close-btn')).toBeInTheDocument();
  });
});
