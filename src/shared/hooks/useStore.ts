import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { StateType, AppDispatchType } from '../types';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
