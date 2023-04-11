import { Appointment } from '../db/dbConn.js'
import { emailResponse } from './emailHandler.js';


export const addAppointment = async (req, res) => { // POST new appointment
  try {
    const appt = new Appointment(req.body)
    const checkDuplicate = await Appointment.exists({ client: req.body.clientEmail, date: req.body.date, service: req.body.service })
    console.log('duplicates: ', checkDuplicate);
    const emailType = 'booking'

    if (checkDuplicate === null) { // Statement checks if appointment already exists
      await appt.save();
      
      if (appt._id) { // Statement checks if appt.save() was successful - method returns doc details
        emailResponse(req, res, emailType); // Nodemailer function to send email to client 
      } else {
        res.send("Appointment booking UNSUCCESSFUL")
      };
    } else {
      res.send({ message: "This appointment already exists."})
    };
  } catch (err) {
    console.log(err);
    res.status(500).send('post error')
  };
};