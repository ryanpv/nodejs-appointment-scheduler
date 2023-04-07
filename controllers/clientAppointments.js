import { Appointment } from "../db/dbConn.js";

export const clientAppointments = async (req, res) => { // GET specific appointment using _id
  try {
    const appointments = await Appointment.find({ client: req.session.user }).exec();

    res.render('pages/appointmentList.ejs', {
      tableData: appointments
    })
  } catch (err) {
    console.log(err);
    res.send(`<p>client fetch appointment error</p> <a href='/'>back to home</a>`)
  };
};