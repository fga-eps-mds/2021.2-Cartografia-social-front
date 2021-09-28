/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../src/pages/Map';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import persistReducers from '../src/store/persistReducers';
import reducers from '../src/store/reducers';
// Note: test renderer must be required after react-native.
jest.useFakeTimers()

const composeEnhancers = compose;

const store = createStore(
  persistReducers(reducers),
  composeEnhancers(applyMiddleware(thunk)),
);

it('first test', () => {
  renderer.create(
    <Provider store={store}>
          <Map />
      </Provider>
  );
});
