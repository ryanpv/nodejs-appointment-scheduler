import { Appointment } from "../db/dbConn.js";
import { emailResponse } from "./emailHandler.js";
import { ObjectId } from 'mongodb'

export const updateHandler = async (req, res) => { // UPDATE appointment time
  const updatedValues = {
      clientEmail: req.body.clientEmail,
      clientName: req.body.clientName,
      clientPhone: req.body.clientPhone,
      date: req.body.date,
      time: req.body.time,
      service: req.body.service,
      details: req.body.details
  }; 
  const emailType = 'update'

  try {
    const updateAppointment = await Appointment.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedValues })
    console.log('update: ', updateAppointment);

    if (updateAppointment.acknowledged === true && updateAppointment.modifiedCount > 0) {
      console.log("successful update");
      emailResponse(req, res, emailType);
    } else {
      console.log("failed update");
      res.send("failed update")
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 'update handler error' })
  };
}