export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type AuthData = {
  email: string;
  password: string;
};

export interface IUser {
  name: string;
  avatarUrl: string;
  isPro: false;
  email: string;
  token: string;
}

export interface IReview {
  offerId: string;
  comment: string;
  rating: number;
}
