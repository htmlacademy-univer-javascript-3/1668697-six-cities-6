import React, { useEffect, useRef, useState } from 'react';

import { Map, TileLayer } from 'leaflet';

import { MAP_ATTRIBUTION, MAP_URL, MAP_ZOOM } from '../constants';
import { useAppSelector } from '../hooks';
import { cityMocks } from '../../mocks/cityMocks';

export const useMap = (mapRef: React.RefObject<HTMLElement>) => {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef<boolean>(false);

  const city = useAppSelector((state) => state.city);
  const cityData = cityMocks[city];

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: cityData.lat,
          lng: cityData.lng
        },
        zoom: MAP_ZOOM
      });

      const layer = new TileLayer(
        MAP_URL,
        {
          attribution: MAP_ATTRIBUTION
        }
      );

      instance.addLayer(layer);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, cityData]);

  return map;
};
