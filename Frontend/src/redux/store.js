import { createStore } from 'redux';

const initialState = {
  isLoggedIn: localStorage.getItem('userId') ? true : false,
  
};

function loginReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
}

const store = createStore(loginReducer);

export default store;