import { Appointment } from '../../db/dbConn.js'
import { emailResponse } from '../emailHandler.js';

export const adminCancel = async (req, res) => { // Admin route to delete appointment
  const admin = true;
  const emailType = 'cancellation'
  
  try {
    const adminCancellation = await Appointment.findOneAndDelete(req.body._id)
    req.body.client = adminCancellation.client // Acquires and sets client email to req.body
    
    if (admin && adminCancellation.client) {
      emailResponse(req, res, emailType)
    } else {
      res.send({ message: "Admin delete: Appointment not found"})
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 'admin cancel error' })
  };
}