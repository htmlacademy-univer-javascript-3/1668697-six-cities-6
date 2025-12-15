export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface ISimpleOfferInfo {
  id: string;
  title: string;
  type: string;
  price: number;
  city: IOfferCity;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export interface IUser {
  name: string;
  avatarUrl: string;
  isPro: false;
  email: string;
  token: string;
}

export interface IDetailedOfferInfo extends ISimpleOfferInfo {
  numberOfRooms: number;
  numberOfGuests: number;
  features: string[];
}

export interface IDetailedOffer {
  id: string;
  info: IDetailedOfferInfo;
  host: IOfferHost;
  reviews: IOfferReview[];
  images: string[];
}

export interface IOfferCity {
  name: string;
  location: LocationType;
}

export enum OfferHostStatus {
  Pro = 'Pro',
  Beginner = 'Beginner'
}

export interface IOfferHost {
  name: string;
  avatar: string;
  status: OfferHostStatus;
  description: string[];
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
