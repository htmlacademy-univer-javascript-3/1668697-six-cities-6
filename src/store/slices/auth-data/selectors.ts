import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getAuthStatus = (state: StateType) => state[NameSpace.AuthData].authStatus;
export const getEmail = (state: StateType) => state[NameSpace.AuthData].email;
