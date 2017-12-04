import {
  USER_CHANGED,
  NEWS_CHANGED
} from './types';

export const userChanged = user => {
  return {
    type: USER_CHANGED,
    payload: user
  };
};

export const newsChanged = news => {
  return {
    type: NEWS_CHANGED,
    payload: news
  };
};
