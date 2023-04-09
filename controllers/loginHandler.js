import { auth } from '../firebase/firebaseClient/firebaseInit.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const loginHandler = async (req, res) => {
  try {
    const userEmailInput = req.body.email;
    const userPasswordInput = req.body.password;
    const userLoginRequest = await signInWithEmailAndPassword(auth, userEmailInput, userPasswordInput);

    const userData = userLoginRequest.user;
    const userUid = userData.uid;
    const userEmail = userData.email;
    const userProfile = userData.providerData; // User account details (email, phone number, uid, etc)
    const userDisplayName = userData.userDisplayName;
    const access_token = userLoginRequest.user.accessToken;
    const refresh_token = userLoginRequest.user.refreshToken;
    // Setting session data
    req.session.authenticated = true;
    req.session.user = userEmail;
    req.session.userId = userUid;
    req.session.access_token = access_token
    // console.log('logged user: ', userLoginRequest);

    res.cookie('currentUser', userEmail, { httpOnly: false, encode: String });
    res.cookie('userId', userUid, { httpOnly: true });
    res.cookie('refreshToken', refresh_token, { httpOnly: true });

    if (req.session.authenticated) {
      console.log('user logged: ', userEmail);
      console.log('session ', req.sessionID);
      res.redirect('/');
    } else {
      res.send(`<p>failed login</p> <a href='/login-page'>back to login</a>`);
    };

// console.log('logged token: ', access_token);

  } catch (err) {
    console.log(err);
    const errCode = err.code;
    const errMsg = err.message;
    res.send(`<p>FAILED. ${ errCode }: ${ errMsg } </p><a href='/login-page'>back to login</a>`);
  };
};