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
  host: IOfferUser;
  images: string[];
  maxAdults: number;
}

export interface IOfferCity {
  name: string;
  location: LocationType;
}

export interface IOfferUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IOfferReview {
  id: string;
  date: string;
  user: IOfferUser;
  comment: string;
  rating: number;
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
