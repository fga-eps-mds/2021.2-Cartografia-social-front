/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../src/pages/Map';
// import {Provider} from 'react-redux';
// import { createStore } from 'redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {persistor, store} from '../src/store/StoreProvider';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(
    // <Provider store={'store'}>
          <Map  />
    // </Provider>
    );
});