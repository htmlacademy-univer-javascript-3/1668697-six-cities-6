import { render, screen } from '@testing-library/react';

import { getMockOfferUser } from '../../../../mocks';

import { OfferHost } from './offer-host';

describe('Component: OfferHost', () => {
  it('should render correctly', () => {
    const mockHost = getMockOfferUser();
    const mockDescription = 'This is a test description';
    const expectedTitle = 'Meet the host';
    const expectedName = mockHost.name;
    const expectedDescription = mockDescription;
    const expectedAvatarAltText = 'Host avatar';

    render(<OfferHost hostData={mockHost} description={mockDescription} />);
    const hostTitle = screen.getByText(expectedTitle);
    const hostName = screen.getByText(expectedName);
    const hostDescription = screen.getByText(expectedDescription);
    const hostAvatar = screen.getByAltText(expectedAvatarAltText);

    expect(hostTitle).toBeInTheDocument();
    expect(hostName).toBeInTheDocument();
    expect(hostDescription).toBeInTheDocument();
    expect(hostAvatar).toBeInTheDocument();
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
