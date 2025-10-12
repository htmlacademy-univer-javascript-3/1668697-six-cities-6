import React, { useEffect, useRef, useState } from 'react';

import {layerGroup, Map, TileLayer, Marker, icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { IOfferCity } from '../../../shared';


interface MapProps {
  city: IOfferCity;
  points: [number, number][];
}

const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const MAP_ZOOM = 10;

export const OffersMap: React.FC<MapProps> = ({ city, points }) => {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef<boolean>(false);

  const mapRef = useRef<HTMLElement>(null);

  const mapIcon = icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 40],
    iconAnchor: [20, 40],
  });

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


  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point[0],
          lng: point[1]
        });

        marker
          .setIcon(mapIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, mapIcon, points]);


  return (
    <section className="cities__map map" style={{height: '500px'}} ref={mapRef}></section>
  );
};
