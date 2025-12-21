import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { layerGroup, Marker } from 'leaflet';

import { MAP_ICONS, useMap } from '../../../../shared';

import { MapProps } from '../model/types';

import 'leaflet/dist/leaflet.css';
import './offers-map.css';

export const OffersMap: React.FC<MapProps> = ({ points, additionalClass }) => {
  const mapRef = useRef<HTMLElement>(null);

  const map = useMap(mapRef);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point[0],
          lng: point[1]
        });

        const currentIconType = point[2];

        marker
          .setIcon(MAP_ICONS[currentIconType])
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);


  return (
    <section className= {classNames('map', additionalClass)} ref={mapRef} />
  );
};
