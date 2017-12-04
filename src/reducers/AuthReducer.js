import {
  NAME_CHANGED,
  NICKNAME_CHANGED,
  NEW_EMAIL_CHANGED,
  NEW_PASSWORD_CHANGED,
  NEW_PASSWORD_CONFIRM_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  nickname: '',
  newEmail: '',
  newPassword: '',
  newPasswordConfirm: '',
  email: '',
  password: '',
  signupErrors: [],
  signinErrors: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case NICKNAME_CHANGED:
      return { ...state, nickname: action.payload };
    case NEW_EMAIL_CHANGED:
      return { ...state, newEmail: action.payload };
    case NEW_PASSWORD_CHANGED:
      return { ...state, newPassword: action.payload };
    case NEW_PASSWORD_CONFIRM_CHANGED:
      return { ...state, newPasswordConfirm: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SIGNUP_USER:
      return { ...state, loading: true, signupErrors: [] };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case SIGNUP_USER_FAIL:
      return { ...state,
        loading: false,
        signupErrors: action.payload,
        newPassword: ''
      };
    case SIGNIN_USER:
      return { ...state, loading: true, signinErrors: [] };
    case SIGNIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case SIGNIN_USER_FAIL:
      return { ...state,
        loading: false,
        signinErrors: action.payload,
        password: ''
      };
    default:
      return state;
  }
};
