import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import userProblemsReducer from './userProblemsReducer';

export default combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    userProblems: userProblemsReducer
});
 