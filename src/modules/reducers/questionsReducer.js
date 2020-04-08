import { GET_ALGO_QS, GET_DB_QS, GET_SHELL_QS, GET_CONCUR_QS } from '../actions/types';

const INITIAL_STATE = {
    algo: [],
    db: [],
    shell: [],
    concur: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALGO_QS:
            return { ...state, algo: action.payload };
        case GET_DB_QS:
            return { ...state, db: action.payload };
        case GET_SHELL_QS:
            return { ...state, shell: action.payload };
        case GET_CONCUR_QS:
            return { ...state, concur: action.payload };
        default:
            return state;
    }
};