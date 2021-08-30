import {combineReducers} from 'redux';
import auth from './auth';
import loader from './loader';

const reducers = combineReducers({
  auth,
  loader,
});

export default reducers;
