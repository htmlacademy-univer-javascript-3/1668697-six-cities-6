import { render, screen } from '@testing-library/react';
import { OfferHost } from './offer-host';
import { getMockOfferUser } from '../../../../mocks';

describe('Component: OfferHost', () => {
  it('should render correctly', () => {
    const mockHost = getMockOfferUser();
    const mockDescription = 'This is a test description';
    const hostTestId = 'host';
    const hostTitleTestId = 'host-title';
    const hostAvatarTestId = 'host-avatar';
    const hostNameTestId = 'host-name';
    const hostDescriptionTestId = 'host-description';

    render(<OfferHost hostData={mockHost} description={mockDescription} />);
    const host = screen.getByTestId(hostTestId);
    const hostTitle = screen.getByTestId(hostTitleTestId);
    const hostAvatar = screen.getByTestId(hostAvatarTestId);
    const hostName = screen.getByTestId(hostNameTestId);
    const hostDescription = screen.getByTestId(hostDescriptionTestId);

    expect(host).toBeInTheDocument();
    expect(hostTitle).toBeInTheDocument();
    expect(hostTitle).toHaveTextContent('Meet the host');
    expect(hostAvatar).toBeInTheDocument();
    expect(hostName).toBeInTheDocument();
    expect(hostName).toHaveTextContent(mockHost.name);
    expect(hostDescription).toBeInTheDocument();
    expect(hostDescription).toHaveTextContent(mockDescription);
  });

  it('should render Pro status when host is pro', () => {
    const mockHost = getMockOfferUser();
    mockHost.isPro = true;
    const mockDescription = 'This is a test description';
    const hostProStatusTestId = 'host-pro-status';

    render(<OfferHost hostData={mockHost} description={mockDescription} />);
    const hostProStatus = screen.getByTestId(hostProStatusTestId);

    expect(hostProStatus).toBeInTheDocument();
    expect(hostProStatus).toHaveTextContent('Pro');
  });

  it('should not render Pro status when host is not pro', () => {
    const mockHost = getMockOfferUser();
    mockHost.isPro = false;
    const mockDescription = 'This is a test description';
    const hostProStatusTestId = 'host-pro-status';

    render(<OfferHost hostData={mockHost} description={mockDescription} />);
    const hostProStatus = screen.queryByTestId(hostProStatusTestId);

    expect(hostProStatus).not.toBeInTheDocument();
  });
});

