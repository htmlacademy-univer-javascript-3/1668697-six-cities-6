import React, { useEffect, useRef, useState } from 'react';

import { Map, TileLayer } from 'leaflet';

import { IOfferCity } from '../types';
import { MAP_ATTRIBUTION, MAP_URL, MAP_ZOOM } from '../constants';

export const useMap = (city: IOfferCity, mapRef: React.RefObject<HTMLElement>) => {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
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
  }, [mapRef, city]);

  return map;
};
