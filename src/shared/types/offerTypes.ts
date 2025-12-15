import { LocationType } from './mapTypes';

export interface ISimpleOfferInfo {
  id: string;
  title: string;
  type: string;
  price: number;
  city: IOfferCity;
  location: LocationType;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type IDetailedOfferInfo = Omit<ISimpleOfferInfo, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: IOfferHost;
  images: string[];
  maxAdults: number;
}


export interface IOfferCity {
  name: string;
  location: LocationType;
}

export interface IOfferHost {
  name: string;
  avatar: string;
  status: string;
}

export interface IOfferReview {
  name: string;
  avatar: string;
  rating: number;
  description: string;
  dateTime: string;
}

export enum OfferCardType {
  Main = 'main',
  Offer = 'offer',
  Favorites = 'favorites'
}

export enum OffersSortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHightToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}
