import faker from 'faker';

import { IOfferCity } from '../shared';

export const getMockCity = (): IOfferCity => ({
  name: faker.address.city(),
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 }),
  },
});
