import React, { useEffect, useRef, useState } from 'react';

import { Map, TileLayer } from 'leaflet';

import { MAP_ATTRIBUTION, MAP_URL } from '../constants';
import { useAppSelector } from '../hooks';

export const useMap = (mapRef: React.RefObject<HTMLElement>) => {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef<boolean>(false);

  const city = useAppSelector((state) => state.city);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
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
  }, [mapRef, city]);

  return map;
};
