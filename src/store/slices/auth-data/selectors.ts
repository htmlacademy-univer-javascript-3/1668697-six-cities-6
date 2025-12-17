import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getAuthStatus = (state: StateType) => state[NameSpace.AuthData].authStatus;
export const getName = (state: StateType) => state[NameSpace.AuthData].name;
