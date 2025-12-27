import faker from 'faker';

import { IOfferUser } from '../shared/types/offer-types';
import { IUser } from '../shared/types/auth-types';

export const getMockOfferUser = (): IOfferUser => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

export const getMockUser = (): IUser => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
});
