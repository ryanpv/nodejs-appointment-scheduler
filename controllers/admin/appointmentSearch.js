import { Appointment } from "../../db/dbConn.js";

export const searchAppointments = async (req, res) => {
  let query = { '$text': { '$search' : `\"${ req.query.searchInput }\"` } } // must ensure text index created on schema. the regex helps with @email lookup
  try {
    const scheduleQuery = await Appointment.find(query);
    console.log(scheduleQuery);
    // res.send(`<p>Search COMPLETE.</p><a href='/'>back to home</a>`)
    res.render('pages/appointmentList.ejs', {
      tableData: scheduleQuery
    });
  } catch (err) {
    console.log(err);
    res.send(`<p>Search query error.</p><a href='/'>back to home</a>`);
  };
};