import firebase from 'firebase';
import request from 'request';
import cheerio from 'cheerio';
// import { Builder, By, Key, until } from 'selenium-webdriver';
// import firefox from 'selenium-webdriver/firefox';
import { firebaseKey } from '../../config/keys';
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_PROBLEM,
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

export const addNewProblem = (obj) => {
  return async (dispatch) => {
    const { url, runTime, memory, status } = obj;

    // const corsUrl = 'https://cors-anywhere.herokuapp.com/' + url;

    // let title = '';
    // let difficulty = '';
    // await request(corsUrl, (err, res, html) => {
    //   if (!err && res.statusCode === 200) {
    //     const $ = cheerio.load(html);
    //     const getTitle = $('.css-v3d350');
    //     const getDifficulty = $('.css-14oi08n')

    //     title = getTitle.text();
    //     difficulty = getDifficulty.text()
    //     console.log(getTitle.text(), getDifficulty.text())
    //   } else {
    //     console.log('didnt go through')
    //   }
    // });

    // let driver = await new Builder().forBrowser('firefox').build();
    // try {
    //   await driver.get(url);
    //   await driver.findElement(By.class('css-v3d350')).then(e => {
    //     e.getText().then(function (text) {
    //       console.log(text);
    //     });
    //   });

    // } finally {
    //   await driver.quit();
    // }

    // console.log(title, difficulty);

    dispatch({
      type: ADD_PROBLEM,
    });
  };
};


