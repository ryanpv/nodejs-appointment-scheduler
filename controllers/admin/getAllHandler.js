import { Appointment } from "../../db/dbConn.js";

export const adminGetAll = async (req, res) => { // GET ALL appointments
  console.log('admin page');
  try {
    const appointments = await Appointment.find({}).limit(5);
    // console.log('appointment: ', appointments);
    // res.send(appointments)
    res.render('pages/appointmentList.ejs', {
      tableData: appointments
    })
  } catch (err) {
    console.log('some get all error');
    res.send({ message: "DB query GET ALL error" })
  };
};