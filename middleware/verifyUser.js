import { getAuth } from "firebase-admin/auth";

export const verifyFirebaseToken = async (req, res, next) => { // middleware to verify user
  try {
    if (req.session.access_token) {
      // console.log('token: ', req.session.access_token);
      const decodeFirebaseToken = await getAuth().verifyIdToken(req.session.access_token)
      req.user = decodeFirebaseToken
      console.log('token decode: ', decodeFirebaseToken);

      // checks for session existence and if session stored user === user that sent access token
      if (req.session.authenticated && req.session.userId === decodeFirebaseToken.uid) {
        decodeFirebaseToken.admin ? res.cookie('userType', 'admin', { httpOnly: false })
          : decodeFirebaseToken.endUser ? res.cookie('userType', 'endUser', { httpOnly: false })
          : res.cookie('userType', 'null', { httpOnly: false });

        return next();
      } else { // ELSE statement to send user to login page 
        res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
      };
      // console.log('decodedToken: ', decodeFirebaseToken);

    } else { // ELSE statement to 'clear' user data if no session/access token n/a (if server restarts, session disappears and this code block will execute)
      res.cookie('currentUser', 'null', { httpOnly: false});
      res.cookie('userId', 'null', { httpOnly: true });
      res.cookie('userType', 'null', { httpOnly: false });
      console.log('no user logged atm');

      res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
    };
  } catch (err) {
    console.log(err);
  };
};

export const checkUser = async (req, res, next) => {
  try {
    if (req.session.authenticated) {
      const userInfo = await getAuth().getUser(req.session.userId)
      console.log('checking user: ', userInfo.customClaims);
      userInfo.customClaims.admin ? res.cookie('userType', 'admin', { httpOnly: false })
        : userInfo.customClaims.endUser ? res.cookie('userType', 'endUser', { httpOnly: false })
        : res.cookie('userType', 'null', { httpOnly: false });
      next()
    } else {
      console.log('no user logged in to check');
      next();
    };
  } catch (err) {
    console.log(err);
  };
};