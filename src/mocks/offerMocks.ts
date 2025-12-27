import faker from 'faker';

import { ISimpleOfferInfo, IDetailedOfferInfo } from '../shared/types/offer-types';
import { getMockCity } from './cityMocks';
import { getMockOfferUser } from './userMocks';

export const getMockSimpleOffer = (): ISimpleOfferInfo => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  city: getMockCity(),
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 }),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
  previewImage: faker.image.imageUrl(),
});

export const getMockDetailedOffer = (): IDetailedOfferInfo => {
  const simpleOffer = getMockSimpleOffer();

  return {
    ...simpleOffer,
    description: faker.lorem.paragraphs(3),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () =>
      faker.random.arrayElement(['Wi-Fi', 'Heating', 'Kitchen', 'Washing machine', 'TV', 'Cable TV', 'Air conditioning'])
    ),
    host: getMockOfferUser(),
    images: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () =>
      faker.image.imageUrl()
    ),
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  };
};

