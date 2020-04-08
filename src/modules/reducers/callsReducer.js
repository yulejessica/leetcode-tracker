import {
  GET_ALGO_QS_INTENT,
  GET_DB_QS_INTENT,
  GET_SHELL_QS_INTENT,
  GET_CONCUR_QS_INTENT,
  GET_ALGO_QS,
  GET_DB_QS,
  GET_SHELL_QS,
  GET_CONCUR_QS,
} from '../actions/types';

const INITIAL_STATE = {
  algo: null,
  db: null,
  shell: null,
  concur: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALGO_QS_INTENT:
      return { ...state, algo: true };
    case GET_DB_QS_INTENT:
      return { ...state, db: true };
    case GET_SHELL_QS_INTENT:
      return { ...state, shell: true };
    case GET_CONCUR_QS_INTENT:
      return { ...state, concur: true };
    case GET_ALGO_QS:
      return { ...state, algo: false };
    case GET_DB_QS:
      return { ...state, db: false };
    case GET_SHELL_QS:
      return { ...state, shell: false };
    case GET_CONCUR_QS:
      return { ...state, concur: false };
    default:
      return state;
  }
};