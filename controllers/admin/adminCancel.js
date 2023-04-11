import { Appointment } from '../../db/dbConn.js'
import { emailResponse } from '../emailHandler.js';
import { ObjectId } from 'mongodb';

export const adminCancel = async (req, res) => { // Admin route to delete appointment
  const admin = true;
  const emailType = 'cancellation'
  console.log(req.body);
  try {
    const adminCancellation = await Appointment.findOneAndDelete(new ObjectId(req.body._id))
    req.body.clientEmail = adminCancellation.clientEmail // Acquires and sets client email to req.body
    console.log('admin cancellation: ', adminCancellation);
    if (admin && adminCancellation.clientEmail) {
      emailResponse(req, res, emailType)
    } else {
      res.send({ message: 'some admin cancel error' })
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 'admin cancel error' })
  };
}