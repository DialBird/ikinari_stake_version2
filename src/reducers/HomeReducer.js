import {
  USER_CHANGED,
  NEWS_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  news: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return { ...state, user: action.payload };
    case NEWS_CHANGED:
      return { ...state, news: action.payload };
    default:
      return state;
  }
};
