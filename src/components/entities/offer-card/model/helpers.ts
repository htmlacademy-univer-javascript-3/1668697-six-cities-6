import { AppRoute } from '../../../../shared';

export const getOfferRouteWithId = (id: string) => AppRoute.Offer.replace(':id', id);
