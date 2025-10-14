import { IDetailedOffer } from '../types';

export const getOffersPoints = (offersData: IDetailedOffer[]) => offersData.map((offer) => offer.info.coordinates);
