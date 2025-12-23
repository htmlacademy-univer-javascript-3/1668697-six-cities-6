import faker from 'faker';

import { IOfferUser } from '../shared/types/offer-types';

export const getMockUser = (): IOfferUser => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

