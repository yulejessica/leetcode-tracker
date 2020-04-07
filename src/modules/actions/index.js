import firebase from 'firebase';
import request from 'request';
import { firebaseKey } from '../../config/keys';
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_PROBLEM,
  GET_ALGO_QS,
  GET_DB_QS,
  GET_SHELL_QS,
  GET_CONCUR_QS
} from './types';

firebase.initializeApp({
  apiKey: firebaseKey,
  authDomain: 'leetcode-progress-tracker.firebaseapp.com',
  databaseURL: 'leetcode-progress-tracker.firebaseio.com/',
  projectId: 'leetcode-progress-tracker'
});
const db = firebase.firestore();


export const signIn = user => {
  // db.collection(user.uid).doc('tags').get()
  // .then((doc) => {
  //     if (!doc.exists) {
  //         db.collection(user.uid).doc('tags').set({
  //             success: 'Tag 1',
  //             warning: 'Tag 2',
  //             error: 'Tag 3'
  //         })
  //     }
  // })
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const signOut = () => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  };
};

export const getAlgoProblems = () => {
  return async (dispatch) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/algorithms/';
    await request(url, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const content = JSON.parse(res.body);        
        const questions = content.stat_status_pairs;
        dispatch({
          type: GET_ALGO_QS,
          payload: questions
        })
      } else {
        console.log('didnt go through')
      }
    });
  };
};

export const getDatabaseProblems = () => {
  return async (dispatch) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/database/';
    await request(url, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const content = JSON.parse(res.body);        
        const questions = content.stat_status_pairs;
        dispatch({
          type: GET_DB_QS,
          payload: questions
        })
      } else {
        console.log('didnt go through')
      }
    });
  };
};

export const getShellProblems = () => {
  return async (dispatch) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/shell/';
    await request(url, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const content = JSON.parse(res.body);        
        const questions = content.stat_status_pairs;
        dispatch({
          type: GET_SHELL_QS,
          payload: questions
        })
      } else {
        console.log('didnt go through')
      }
    });
  };
};

export const getConcurProblems = () => {
  return async (dispatch) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/concurrency/';
    await request(url, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const content = JSON.parse(res.body);   
        const questions = content.stat_status_pairs;
        dispatch({
          type: GET_CONCUR_QS,
          payload: questions
        })
      } else {
        console.log('didnt go through')
      }
    });
  };
};

export const addNewProblem = (obj) => {
  return async (dispatch) => {
    const { url, title, difficulty, time, runTime, memory, status } = obj;
    

    dispatch({
      type: ADD_PROBLEM,
    });
  };
};


