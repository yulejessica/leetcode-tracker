import { GET_USER_QS } from '../actions/types';

const INITIAL_STATE = {
    problems: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_QS:
            return {...state, problems: action.payload };
        default:
            return state;
    }
};