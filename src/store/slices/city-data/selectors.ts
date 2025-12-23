import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getCity = (state: Pick<StateType, NameSpace.CityData>) => state[NameSpace.CityData].city;
