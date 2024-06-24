/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Action,
  configureStore,
  Reducer,
  Store,
  UnknownAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkDispatch } from 'redux-thunk';

// import RtkQueryService from '../services/ApiService.ts';

import rootReducer, { AsyncReducers, RootState } from './rootReducer.ts';

const middlewares : any[] = [
  // RtkQueryService.middleware,
];
const persistConfig = {
  key: 'kanban-task-management',
  keyPrefix: '',
  storage,
};

export interface CustomStore extends Store<RootState, UnknownAction> {
  asyncReducers?: AsyncReducers
}
/**
 *  immutableCheck: Ensures that the state is not mutated by reducers.
 *  serializableCheck: Ensures that all actions and state are serializable.
 *
 * By ignoring actions in serializableCheck, your middleware will not report these actions as
 * containing non-serializable values. This means:
 * No warnings will be thrown for the ignored actions regarding serialization issues.
 * The ignored actions can contain non-serializable values without causing problems in the dev env.
 */
const store : CustomStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer() as Reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }).concat(middlewares),
  devTools: import.meta.env.DEV,
});
store.asyncReducers = {};

export const persistor = persistStore(store);

export function injectReducer(key: string, reducer: Reducer<unknown, Action>) {
  if (store.asyncReducers) {
    if (store.asyncReducers[key]) {
      return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
      persistReducer(
        persistConfig,
        rootReducer(store.asyncReducers) as Reducer,
      ),
    );
  }
  persistor.persist();
  return store;
}

export default store;
export type AppDispatch = typeof store.dispatch;

type TypedDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
