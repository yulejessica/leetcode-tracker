import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

// styling
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "antd/dist/antd.css";


const Auth = () => {

    // auth configuration
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__content">
                    <div className="auth__content--logo">
                        <div className="auth__content--logo-svg" />
                    </div>
                    <div className="auth__content--login">
                        <div className="auth__content-header">Leetcode Progress Tracker</div>
                        <div className="auth__content-buttons">
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null)(Auth);
