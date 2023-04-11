import { Appointment } from "../db/dbConn.js";

export const clientAppointments = async (req, res) => { // GET specific appointment using _id
  try {
    const appointments = await Appointment.find({ clientEmail: req.session.user }).exec();
    console.log('isEndUser?: ', req.user.endUser === undefined ? 'false' : req.user.endUser);
    console.log('isAdmin?: ', req.user.admin === undefined ? 'false' : req.user.admin);

    res.render('pages/appointmentList.ejs', {
      tableData: appointments
    })
  } catch (err) {
    console.log(err);
    res.send(`<p>client fetch appointment error</p> <a href='/'>back to home</a>`)
  };
};