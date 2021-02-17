import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import sessionReducer from './session'
import cartsReducer from './carts'
import reservationsReducer from './reservations'
import reviewsReducer from './reviews';


const rootReducer = combineReducers({
  session: sessionReducer,
  carts: cartsReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
