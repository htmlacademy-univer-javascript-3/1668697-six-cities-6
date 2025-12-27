import { NameSpace } from '../../../shared';
import { getCity } from './selectors';

import { getMockCity } from '../../../mocks';

describe('CityData selectors', () => {
  const state = {
    [NameSpace.CityData]: {
      city: getMockCity()
    }
  };

  it('should return city from state', () => {
    const { city } = state[NameSpace.CityData];
    const result = getCity(state);
    expect(result).toBe(city);
  });
});
