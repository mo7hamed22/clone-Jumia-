import { userConstants } from '../_constants/user.constants';
let user = JSON.parse(localStorage.getItem('user'));
const intailState = user ? { LoggedIn: true, user } : {};

export function authentication(state = intailState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

