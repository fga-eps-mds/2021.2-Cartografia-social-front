import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import persistReducers from './persistReducers';
import reducers from './reducers';

const composeEnhancers = compose;

const store = createStore(
  persistReducers(reducers),
  composeEnhancers(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export {store, persistor};
