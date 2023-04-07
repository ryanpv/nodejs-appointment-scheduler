import { Appointment } from "../../db/dbConn.js";

export const getDailyAppointments = async (req, res) => {
  
  try {
    const filterDaily = await Appointment.find({ date: req.query.date })
    console.log('filter: ', filterDaily);
    console.log('req :', req.query.date);
    res.render('pages/dailyFilter.ejs', {
      tableData: filterDaily,
      dateQuery: req.query.date
    });
    // res.send(filterDaily)
    
  } catch (error) {
    console.log(error);
    res.send('some error with GET daily')
  }
}