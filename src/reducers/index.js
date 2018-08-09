import { combineReducers } from 'redux';
import navBar from './NavBar';

const RootReducer = combineReducers({
  navBar: navBar  
});

export default RootReducer;