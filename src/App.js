import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

import { signIn, signOut } from './modules/actions';

import './style/css/App.css';

const App = (props) => {

  const [authenticating, isAutheticating] = useState(true);

  const authUser = () => {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
          props.signIn(user);
        } else {
          reject('user not logged in');
        }
      });
    });
  };

  useEffect(() => {
    authUser().then((user) => {
      isAutheticating(false);
    }, (error) => {
      isAutheticating(false);
    })
    // eslint-disable-next-line
  }, []);

  if (authenticating) {
    return null;
  } else if (!props.isSignedIn && !props.user) {
    return <Auth />;
  } else if (props.isSignedIn && props.user) {
    return <Dashboard />;
  } else {
    return <div>something went wrong</div>
  }
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user
  }
};

export default connect(mapStateToProps, {
  signIn,
  signOut
})(App);
