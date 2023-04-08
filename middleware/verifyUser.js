import { appAdmin } from "../firebase/firebaseAdmin/firebaseAdminConfig.js"
import { getAuth } from "firebase-admin/auth";

export const verifyFirebaseToken = async (req, res, next) => { // middleware to verify user
  try {
    if (req.session.access_token) {
      // console.log('token: ', req.session.access_token);
      const decodeFirebaseToken = await getAuth().verifyIdToken(req.session.access_token)
      req.user = decodeFirebaseToken

      if (req.session.authenticated && req.session.userId === decodeFirebaseToken.uid) {
        // console.log('middleware session user: ', req.session.userId);
        // console.log('middleware decodedtoken: ', decodeFirebaseToken);
        return next();
      } else { // ELSE statement to send user to login page 
        res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
      };
      // console.log('decodedToken: ', decodeFirebaseToken);

    } else { // ELSE statement to 'clear' user data if no session/access token n/a
      res.cookie('currentUser', 'null', { httpOnly: false});
      res.cookie('userId', 'null', { httpOnly: true });
      console.log('no user logged atm');

      res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
    };
  } catch (err) {
    console.log(err);
  };
};