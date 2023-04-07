import { Appointment } from '../db/dbConn.js'
import { emailResponse } from './emailHandler.js';

export const clientCancel = async (req, res) => {
  const emailType = 'cancellation';
  
  try {
    const cancelAppointment = await Appointment.deleteOne({ client: req.body.client, date: req.body.date, time: req.body.time, service: req.body.service })
    console.log('result: ', cancelAppointment);
    
    if (cancelAppointment.acknowledged === true && cancelAppointment.deletedCount > 0) {
      console.log("successful client cancel: ", cancelAppointment);
      emailResponse(req, res, emailType)
    } else {
      res.send({ message: "Appointment not found"})
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 'client cancel error' })
  };
};

