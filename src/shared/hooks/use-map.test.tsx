import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { withStore, getMockState, getMockCity } from '../../mocks';
import { NameSpace } from '../constants';

import { useMap } from './use-map';

vi.mock('leaflet', () => ({
  Map: vi.fn().mockImplementation(() => ({
    setView: vi.fn(),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
  })),
  TileLayer: vi.fn(),
  icon: vi.fn().mockReturnValue({}),
}));

describe('Hook: useMap', () => {
  it('should return null when mapRef is null', () => {
    const mapRef = { current: null };
    const wrapper = ({ children }: { children: ReactNode }) => {
      const { withStoreComponent } = withStore(
        children as JSX.Element,
        getMockState({
          [NameSpace.CityData]: {
            city: getMockCity(),
          },
        })
      );
      return withStoreComponent;
    };

    const { result } = renderHook(() => useMap(mapRef), { wrapper });

    expect(result.current).toBeNull();
  });

  it('should return Map instance when mapRef and city are provided', () => {
    const mapElement = document.createElement('div');
    const mapRef = { current: mapElement };
    const mockCity = getMockCity();

    const wrapper = ({ children }: { children: ReactNode }) => {
      const { withStoreComponent } = withStore(
        children as JSX.Element,
        getMockState({
          [NameSpace.CityData]: {
            city: mockCity,
          },
        })
      );
      return withStoreComponent;
    };

    const { result } = renderHook(() => useMap(mapRef), { wrapper });

    expect(result.current).not.toBeNull();
    expect(result.current).toHaveProperty('setView');
    expect(result.current).toHaveProperty('addLayer');
  });
});

