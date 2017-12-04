import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { USERS_URL, LOGIN_URL, INFOS_URL } from '../common/urls';

const USER_KEY = 'user_key';

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        // まだログインしていない場合
        if (res === null) return resolve(false);

        // ログインした後、トークンが有効なままかどうか
        getProfile(res)
          .then(res => {
            if (res.data !== null) return resolve(true);

            alert('トークンの期限が切れたので、ログインしなおしてください');
            onSignOut();
            resolve(false);
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

export const onSignUp = (user_params) => axios.post(USERS_URL, user_params);

export const onSignIn = (session_params) => axios.post(LOGIN_URL, session_params);

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const storeToken = (accessToken) => AsyncStorage.setItem(USER_KEY, accessToken);

export const getToken = () => AsyncStorage.getItem(USER_KEY);

export const getProfile = (accessToken) => axios.get(USERS_URL + '/' + accessToken);

export const getNews = () => axios.get(INFOS_URL);

export const getUsers = (type = null) => {
  let url = USERS_URL + '/' + type;
  return axios.get(url);
};
