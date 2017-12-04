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
  SIGNIN_USER_FAIL
} from './types';
import { onSignUp, onSignIn, storeToken } from '../common/auth';

export const nameChanged = name => {
  return {
    type: NAME_CHANGED,
    payload: name
  };
};

export const nicknameChanged = nickname => {
  return {
    type: NICKNAME_CHANGED,
    payload: nickname
  };
};

export const newEmailChanged = email => {
  return {
    type: NEW_EMAIL_CHANGED,
    payload: email
  };
};

export const newPasswordChanged = password => {
  return {
    type: NEW_PASSWORD_CHANGED,
    payload: password,
  };
};

export const newPasswordConfirmChanged = password => {
  return {
    type: NEW_PASSWORD_CONFIRM_CHANGED,
    payload: password,
  };
};

export const emailChanged = email => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

export const passwordChanged = password => {
  return {
    type: PASSWORD_CHANGED,
    payload: password,
  };
};

export const signupUser = (user_params, navigation) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    onSignUp(user_params)
      .then(res => {
        const accessToken = res.data;
        // Reduxは自分で初期化しないと残ってしまう
        dispatch({ type: SIGNUP_USER_SUCCESS});
        storeToken(accessToken)
          .then(()=>navigation.navigate('SignedIn'))
          .catch(err => alert('StoreToken Err: ' + err));
      })
      .catch(errors => {
        const formErrors = errors.response.data;
        let errorsArray = [];
        for (let key in formErrors) {
          formErrors[key].map(err=>errorsArray.push(`${key} ${err}`));
        }
        dispatch({ type: SIGNUP_USER_FAIL, payload: errorsArray });
      });
  };
};

export const loginUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    const session_params = { session: { email, password } };
    dispatch({ type: SIGNIN_USER });
    onSignIn(session_params)
      .then(res => {
        const accessToken = res.data;
        // Reduxは自分で初期化しないと残ってしまう
        dispatch({ type: SIGNIN_USER_SUCCESS});
        storeToken(accessToken)
          .then(()=>navigation.navigate('SignedIn'))
          .catch(err => alert('StoreToken Err: ' + err));
      })
      .catch(errors => {
        const formErrors = errors.response.data;
        let errorsArray = [];
        for (let key in formErrors) {
          formErrors[key].map(err=>errorsArray.push(`${key} ${err}`));
        }
        dispatch({ type: SIGNIN_USER_FAIL, payload: errorsArray });
      });
  };
};
