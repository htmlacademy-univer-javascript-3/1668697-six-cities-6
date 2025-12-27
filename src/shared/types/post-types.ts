export interface IReview {
  offerId: string;
  comment: string;
  rating: number;
}

export interface IFavoriteUpdate {
  offerId: string;
  status: number;
}
