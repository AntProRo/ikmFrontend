import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  LOGOUT,
  ALERT_FAIL_ACTIVATED,
  ALERT_FAIL_DISABLED,
  ALERT_SUCCESS_ACTIVATED,
  ALERT_SUCCESS_DISABLED,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  errorAlert: false,
  successAlert: false,
};
export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        successAlert: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case ACTIVATION_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case ALERT_SUCCESS_ACTIVATED: {
      return {
        ...state,
        successAlert: true,
      };
    }
    case ALERT_SUCCESS_DISABLED: {
      return {
        ...state,
        successAlert: false,
      };
    }
    case ALERT_FAIL_DISABLED:
      return {
        ...state,
        errorAlert: false,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_FAIL:
    case PASSWORD_RESET_FAIL:
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case ALERT_FAIL_ACTIVATED:
      return {
        ...state,
        errorAlert: true,
      };
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
  
/*     case PASSWORD_RESET_CONFIRM_FAIL:
        return {
        ...state,
      }; */
    default:
      return state;
  }
}
