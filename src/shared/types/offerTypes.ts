export enum OfferPlaceType {
  Apartment = 'Apartment',
  Flat = 'Flat',
  House = 'House'
}

export enum OfferHostStatus {
  Pro = 'Pro',
  Beginner = 'Beginner'
}

export enum OfferCity {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export interface ISimpleOfferInfo {
  title: string;
  rating: number;
  price: number;
  placeType: OfferPlaceType;
  image: string;
  city: OfferCity;
  coordinates: [number, number];
  isPremium?: boolean;
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

export interface IOfferCity {
  id: number;
  title: OfferCity;
  lat: number;
  lng: number;
}

export enum OfferCardType {
  Main = 'main',
  Offer = 'offer',
  Favorites = 'favorites'
}
