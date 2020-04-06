import firebase from 'firebase';
import { firebaseKey } from '../../config/keys';
import {
  SIGN_IN,
  SIGN_OUT,
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


