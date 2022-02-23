/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import {
  createStore, combineReducers, applyMiddleware, compose, StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';
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

const rootReducer = combineReducers({
  session: sessionReducer,
  carts: cartsReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

let enhancer: StoreEnhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState: RootState) => {
  createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
