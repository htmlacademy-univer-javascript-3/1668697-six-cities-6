import faker from 'faker';

import { IOfferReview } from '../shared/types/offer-types';
import { getMockUser } from './userMocks';

export const getMockReview = (): IOfferReview => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: getMockUser(),
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

