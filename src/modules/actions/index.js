import firebase from 'firebase';
import request from 'request';
import { firebaseKey } from '../../config/keys';
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_PROBLEM,
  GET_USER_QS,
  GET_ALGO_QS,
  GET_DB_QS,
  GET_SHELL_QS,
  GET_CONCUR_QS,
  GET_ALGO_QS_INTENT,
  GET_DB_QS_INTENT,
  GET_SHELL_QS_INTENT,
  GET_CONCUR_QS_INTENT,
} from './types';

firebase.initializeApp({
  apiKey: firebaseKey,
  authDomain: 'leetcode-progress-tracker.firebaseapp.com',
  databaseURL: 'leetcode-progress-tracker.firebaseio.com/',
  projectId: 'leetcode-progress-tracker'
});
const db = firebase.firestore();


export const signIn = user => {
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

export const getUserProblems = () => {
  return async (dispatch) => {
    let test = [];
    await db.collection(firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        test.push(doc.data());
      });
    })
    dispatch({
      type: GET_USER_QS,
      payload: test
    })
  };
};
export const getProblemsDispatch = () => {
  return (dispatch) => {
    dispatch(getAlgoProblemsIntent())
    dispatch(getDatabaseProblemsIntent())
    dispatch(getShellProblemsIntent())
    dispatch(getConcurProblemsIntent())
  }
}

export const getAlgoProblemsIntent = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ALGO_QS_INTENT
    });
    dispatch(getAlgoProblems());
  };
};

export const getDatabaseProblemsIntent = () => {
  return (dispatch) => {
    dispatch({
      type: GET_DB_QS_INTENT
    });
    dispatch(getDatabaseProblems());
  };
};

export const getShellProblemsIntent = () => {
  return (dispatch) => {
    dispatch({
      type: GET_SHELL_QS_INTENT
    });
    dispatch(getShellProblems());
  };
};

export const getConcurProblemsIntent = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CONCUR_QS_INTENT
    });
    dispatch(getConcurProblems());
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
        console.log('didnt go through');
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
    const { url, title, difficulty, time, runTime, memory, status, date } = obj;
    const uid = firebase.auth().currentUser.uid;
    const problemId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // problem in db ? merge : create
    db.collection(uid).doc(title).get()
      .then(doc => {
        if (doc.exists) {
          console.log('exists', doc);
          db.collection(uid).doc(title).set({
            title,
            url,
            difficulty,
            attempts: {
              [problemId]: {
                id: problemId,
                time,
                runTime,
                memory,
                status,
                date
              }
            }
          }, { merge: true });
        } else {
          console.log('empty');
          db.collection(uid).doc(title).set({
            title,
            url,
            difficulty,
            attempts: {
              [problemId]: {
                id: problemId,
                time,
                runTime,
                memory,
                status,
                date
              }
            }
          });
        }
      });
    dispatch({
      type: ADD_PROBLEM,
    });
    return;
  };
};


