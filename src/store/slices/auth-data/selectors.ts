import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getAuthStatus = (state: Pick<StateType, NameSpace.AuthData>) => state[NameSpace.AuthData].authStatus;
export const getEmail = (state: Pick<StateType, NameSpace.AuthData>) => state[NameSpace.AuthData].email;
