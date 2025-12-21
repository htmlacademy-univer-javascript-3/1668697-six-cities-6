import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getError = (state: StateType) => state[NameSpace.ErrorData].error;


