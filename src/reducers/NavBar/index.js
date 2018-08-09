import _ from 'lodash';
import { SHOW_DRAW } from '../../actions/NavBar';

const initialState = {
  onClickMenu: false,
}

const reducer = (state = initialState, action) => {
  let newState = _.cloneDeep(state);
  
  switch(action.type) {
    case SHOW_DRAW:
      newState.onClickMenu = !newState.onClickMenu;
      return newState;
    default:
      return state;
  }
}

export default reducer;