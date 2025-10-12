import { IDetailedOffer } from '../../../shared';

export const getOffersPoints = (offersData: IDetailedOffer[]) => offersData.map((offer) => offer.info.coordinates);
