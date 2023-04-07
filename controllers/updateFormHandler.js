import { Appointment } from "../db/dbConn.js";

export const updateFormHandler = async (req, res) => { // Renders update form - checks for doc existence with findById
  try {
    const getAppointment = await Appointment.findById(req.params.id);

    if (getAppointment){ // Returns doc data if it exists
      res.render('pages/updateForm.ejs', {
        data: getAppointment
      });
    } else {
      res.send({ message: "Appointment does not exist" });
    };
  } catch (err) {
    console.log(err);
    res.send({ message: "Appointment does not exist" });
  };
};