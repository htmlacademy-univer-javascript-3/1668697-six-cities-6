import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getCity = (state: StateType) => state[NameSpace.CityData].city;
