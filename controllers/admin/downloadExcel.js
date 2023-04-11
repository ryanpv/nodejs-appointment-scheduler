import excelJS from "exceljs";
import { Appointment } from "../../db/dbConn.js";

export const excelDownloader = async (req, res) => {
  console.log('reached excel download page');
  const workbook = new excelJS.Workbook(); // creates new workbook
  const worksheet = workbook.addWorksheet(`Appointment_List_${ req.query.date }`); /// creates new worksheet and reference to it
  const path = "controllers/admin/excelSheets";

  worksheet.columns = [
    { header: "Client Name", key: "clientName", width: 10 },
    { header: "Email", key: "clientEmail", width: 10 },
    { header: "Phone", key: "clientPhone", width: 10 },
    { header: "Schedule", key: "date", width: 10 },
    { header: "Time", key: "time", width: 10 },
    { header: "Service", key: "service", width: 10 },
    { header: "Details", key: "details"}
  ]

  try {
    const getDailyAppointments = await Appointment.find({ date: req.query.date });

    getDailyAppointments.forEach((appointment) => {
      worksheet.addRow(appointment);
    });
    const data = await workbook.xlsx.writeFile(`${ path }/daySchedule_${ req.query.date }.xlsx`)

    res.send({ message: 'successful excel export', path: `${ path }/daySchedule_${ req.query.date }.xlsx` })
  } catch (err) {
    console.log(err);
    res.send('some error with excel download func')
  };

  res.end();
};