import React, { useEffect, useRef } from 'react';

import { layerGroup, Marker } from 'leaflet';

import { MAP_ICON, useMap } from '../../../shared';

import { MapProps } from '../model/types';

import 'leaflet/dist/leaflet.css';
import './OffersMap.css';

export const OffersMap: React.FC<MapProps> = ({ city, points }) => {
  const mapRef = useRef<HTMLElement>(null);

  const map = useMap(city, mapRef);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point[0],
          lng: point[1]
        });

        marker
          .setIcon(MAP_ICON)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);


  return (
    <section className="cities__map map map_full" ref={mapRef} />
  );
};
