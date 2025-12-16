import { IOfferCity } from '../../../shared';

interface ICityData {
  city: IOfferCity;
}

export const initialState: ICityData = {
  city: { name: '', location: { latitude: 0, longitude: 0, zoom: 0 } },
};
