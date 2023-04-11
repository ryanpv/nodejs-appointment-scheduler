import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyUser.js";
import { adminGetAll } from "../controllers/admin/getAllHandler.js";
import { getDailyAppointments } from "../controllers/admin/getDailyHandler.js";
import { excelDownloader } from "../controllers/admin/downloadExcel.js";

const router = express.Router();

router.route('/admin-get-appointments')
  .get(verifyFirebaseToken, adminGetAll);

router.route('/get-daily-appointments')
  .get(verifyFirebaseToken, getDailyAppointments);

router.route('/download-excel')
  .get(verifyFirebaseToken, excelDownloader);

export default router;