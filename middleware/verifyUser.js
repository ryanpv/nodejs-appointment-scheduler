import { getAuth } from "firebase-admin/auth";

export const verifyFirebaseToken = async (req, res, next) => { // middleware to verify user
  try {
    const isAuthenticated = req.session.authenticated;
    const userTypeCookie = req.cookies.userType;
    const sessionUserId = req.session.userId; 

    if (isAuthenticated && req.session.access_token) {
      const decodeFirebaseToken = await getAuth().verifyIdToken(req.session.access_token)
      req.user = decodeFirebaseToken
      // console.log('token decode: ', decodeFirebaseToken);

      // checks for session existence and if session stored user === user that sent access token
      if (isAuthenticated && userTypeCookie === 'admin' || isAuthenticated && userTypeCookie === 'endUser') { // if user is authenticated and userType cookie value already set (!== null) then call next(). no need to set cookies again
        console.log('user already authenticated');
        return next();
      } else if (isAuthenticated && sessionUserId === decodeFirebaseToken.uid) {
        decodeFirebaseToken.admin ? res.cookie('userType', 'admin', { httpOnly: false })
          : decodeFirebaseToken.endUser ? res.cookie('userType', 'endUser', { httpOnly: false })
          : res.cookie('userType', 'null', { httpOnly: false });

        return next();
      } else { // ELSE statement to send user to login page 
        res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
      };
    } else { // ELSE statement to 'clear' user data if no session/access token n/a (if server restarts, session disappears and this code block will execute)
      res.cookie('currentUser', 'null', { httpOnly: false});
      res.cookie('userId', 'null', { httpOnly: true });
      res.cookie('userType', 'null', { httpOnly: false });
      console.log('no user logged atm');

      res.send(`<p>User unverified, please try again</p><a href='/login-page'>back to LOGIN</a>`)
    };
  } catch (err) {
    console.log(err);
    res.send(err.message)
  };
};

export const checkUser = async (req, res, next) => {
  try {
    if (req.session.authenticated) {
      const userInfo = await getAuth().getUser(req.session.userId)

      userInfo.customClaims.admin ? res.cookie('userType', 'admin', { httpOnly: false })
        : userInfo.customClaims.endUser ? res.cookie('userType', 'endUser', { httpOnly: false })
        : res.cookie('userType', 'not acquired yet', { httpOnly: false });
      next()
    } else {
      console.log('no user logged in to check');
      next();
    };
  } catch (err) {
    console.log(err);
  };
};