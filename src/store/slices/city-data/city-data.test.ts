import { cityData } from './city-data';
import { fetchOffers } from '../../async-action';

import { getMockCity, getMockSimpleOffer } from '../../../mocks';

describe('CityData slice', () => {
  const initialState = {
    city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
    };

    const result = cityData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
    };

    const result = cityData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('"setCity" should set city', () => {
    const mockCity = getMockCity();
    const expectedState = {
      city: mockCity,
    };

    const result = cityData.reducer(
      initialState,
      cityData.actions.setCity(mockCity)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchOffers.fulfilled" should set city from first offer when payload contains offers', () => {
    const mockOffer1 = getMockSimpleOffer();
    const mockOffer2 = getMockSimpleOffer();
    const mockOffers = [mockOffer1, mockOffer2];
    const expectedState = {
      city: mockOffer1.city,
    };

    const result = cityData.reducer(
      initialState,
      fetchOffers.fulfilled(mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('"fetchOffers.fulfilled" should not change city when payload is empty array', () => {
    const expectedState = {
      city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
    };

    const result = cityData.reducer(
      initialState,
      fetchOffers.fulfilled([], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });
});
