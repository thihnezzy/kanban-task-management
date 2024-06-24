import {
  UnknownAction, CombinedState, combineReducers,
  Reducer,
} from 'redux';

import board, { BoardState } from './dashboard/board';

// import RtkQueryService from '../services/ApiService';
// Add any new reducers to this type
export type RootState = CombinedState<{
  board: BoardState;
  // [RtkQueryService.reducerPath]: any
}>;

export interface AsyncReducers {
  [key: string]: Reducer<unknown, UnknownAction>
}

const staticReducers = {
  board,
  // [RtkQueryService.reducerPath]: RtkQueryService.reducer,
};

const rootReducer = (asyncReducers?: AsyncReducers) => (state: RootState, action: UnknownAction) => {
  const combinedReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
