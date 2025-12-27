import { NameSpace } from '../../../shared';
import { StateType } from '../../../shared';

export const getError = (state: Pick<StateType, NameSpace.ErrorData>) => state[NameSpace.ErrorData].error;
