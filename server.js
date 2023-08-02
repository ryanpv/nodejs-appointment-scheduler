import express from 'express';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { appAdmin } from './firebase/firebaseAdmin/firebaseAdminConfig.js';

import { mongooseConn, Appointment } from './db/dbConn.js';
import { addAppointment } from './controllers/postHandler.js';
import { clientCancel } from './controllers/clientCancel.js';
import { updateHandler } from './controllers/updateHandler.js';
import { adminCancel } from './controllers/admin/adminCancel.js';
import { signupRequest } from './controllers/signupHandler.js';
import { loginHandler } from './controllers/loginHandler.js';
import { updateFormHandler } from './controllers/updateFormHandler.js';
import { clientAppointments } from './controllers/clientAppointments.js';
import { checkUser, verifyFirebaseToken } from './middleware/verifyUser.js';
import adminRouter from "./routers/adminRoutes.js"; 


const PORT = 3001;
const app = express();
const store = new session.MemoryStore(); // use connect-mongo for PROD instead

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'qwertyasdf',
  saveUninitialized: false,
  // cookie: { maxAge: 30000 },
  resave: false,
  store: store
}));
app.use("/admin", adminRouter); // Routes for admin functions

app.set('view engine', 'ejs');

/////////// RENDER ROUTES /////////// 

app.get('/', checkUser, (req, res) => { // Renders homepage
  res.render('pages/homePage.ejs')
});

app.get('/appointment-unauthorized', (req, res) => {
  res.send(`<p>UNAUTHORIZED! Please <a href='/login-page'>LOG IN</a> to see appointments or go <a href='/'>BACK TO HOMEPAGE</a> instead.</p>`)
});

app.get('/booking-form', async (req, res) => { // Renders booking form
  res.render('pages/bookingForm.ejs')
});

app.get('/cancellation-form', async (req, res) => { // Renders cancellation form for CLIENT
  res.render('pages/cancelForm.ejs')
});

app.get('/update-form/:id', updateFormHandler); // Renders update form with item's data filled in

app.get('/signup-page', (req, res) => { // Render sign up form
  res.render('pages/signUpPage.ejs')
});

app.get('/login-page', (req, res) => { // Render log in page
  if (req.session.authenticated) {
    console.log('user logged in.');
    res.send(`<p>User already logged in. to change accounts, please logout first.</p><a href='/'>back to home</a>`)
  } else {
    console.log('no user');
    res.render('pages/loginPage.ejs')
  }
});

app.get('/logout', (req, res) => { // Logout function route
  req.session.destroy();
  res.cookie('currentUser', 'null', { httpOnly: false });
  res.cookie('userId', 'null', { httpOnly: true });
  res.cookie('userType', 'null', { httpOnly: false });
  res.cookie('connect.sid', 'null');
  res.clearCookie('refreshToken');

  res.send(`<p>LOGGED OUT!</p><a href='/'>back to home</a>`);
})

app.post('/signup-request', signupRequest); // Sign up request through firebase-admin SDK

app.post('/login-request', loginHandler); // Log in route - begins session

app.post('/sign-up-success', (req, res) => {
  console.log(req.body);
  res.send(`<p>success</p> <a href='/signup-page'>back to signup</a>`);
})

/////////////////// MONGODB ROUTES//////////////////

app.get("/user-appointments", verifyFirebaseToken, clientAppointments);

app.post("/add-appointment", addAppointment) // POST new appointment

app.post("/update-appointment/:id", verifyFirebaseToken, updateHandler); // UPDATE appointment through FORM

app.post("/cancel-appointment", verifyFirebaseToken, clientCancel); // DELETE appointment through FORM

app.post("/cancel-request", verifyFirebaseToken, adminCancel); // DELETE appointment 



app.listen(PORT, () => {
  mongooseConn
  console.log(`listening on port: ${ PORT }`)
});