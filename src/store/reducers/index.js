import {combineReducers} from 'redux';
import auth from './auth';
import loader from './loader';
import markers from './markers';

const reducers = combineReducers({
  auth,
  loader,
  markers,
});

export default reducers;
