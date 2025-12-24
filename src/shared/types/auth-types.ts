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
  isPro: boolean;
  email: string;
  token: string;
}
