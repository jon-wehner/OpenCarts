/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import sessionReducer from './session';
import cartsReducer from './carts';
import reservationsReducer from './reservations';
import reviewsReducer from './reviews';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducer = ({
  session: sessionReducer,
  carts: cartsReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default configureStore;
