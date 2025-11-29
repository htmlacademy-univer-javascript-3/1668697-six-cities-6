import { IOfferCity, OfferCity } from '../shared';

export const cityMocks: Record<OfferCity, IOfferCity> = {
  [OfferCity.Paris]: {
    id: 1,
    title: OfferCity.Paris,
    lat: 48.8566,
    lng: 2.3522
  },
  [OfferCity.Cologne]: {
    id: 2,
    title: OfferCity.Cologne,
    lat: 50.9375,
    lng: 6.9603
  },
  [OfferCity.Brussels]: {
    id: 3,
    title: OfferCity.Brussels,
    lat: 50.8503,
    lng: 4.3517
  },
  [OfferCity.Amsterdam]: {
    id: 4,
    title: OfferCity.Amsterdam,
    lat: 52.3676,
    lng: 4.9041
  },
  [OfferCity.Hamburg]: {
    id: 5,
    title: OfferCity.Hamburg,
    lat: 53.5511,
    lng: 9.9937
  },
  [OfferCity.Dusseldorf]: {
    id: 6,
    title: OfferCity.Dusseldorf,
    lat: 51.2277,
    lng: 6.7735
  }
};
