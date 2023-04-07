import { getAuth } from "firebase-admin/auth";

export const signupRequest = async (req, res) => {
  try {
    const createUser = await getAuth()
      .createUser({
        email: req.body.signupEmail,
        password: req.body.password
      });

      console.log('new user: ', createUser);
      res.send(`<p>SUCCESS</p> <a href='/login-page'>Go to LOGIN</a>`);
  } catch (err) {
    console.log(err);
    const errCode = err.code;
    const errMsg = err.message;
    res.send(`<p>SIGN UP FAILED. ${ errCode }: ${ errMsg } </p><a href='/signup-page'>back to signup</a>`);
  };
};