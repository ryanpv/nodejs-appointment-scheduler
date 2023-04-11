import express from "express";
import { checkIfAdmin, verifyFirebaseToken } from "../middleware/verifyUser.js";
import { adminGetAll } from "../controllers/admin/getAllHandler.js";
import { getDailyAppointments } from "../controllers/admin/getDailyHandler.js";
import { excelDownloader } from "../controllers/admin/downloadExcel.js";
import { searchAppointments } from "../controllers/admin/appointmentSearch.js";

const router = express.Router();

router.route('/admin-get-appointments')
  .get(verifyFirebaseToken, checkIfAdmin, adminGetAll);

router.route('/get-daily-appointments')
  .get(verifyFirebaseToken, checkIfAdmin, getDailyAppointments);

router.route('/download-excel')
  .get(verifyFirebaseToken, checkIfAdmin, excelDownloader);

router.route('/admin-search')
  .get(verifyFirebaseToken, checkIfAdmin, searchAppointments);

export default router;