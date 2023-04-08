import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyUser.js";
import { adminGetAll } from "../controllers/admin/getAllHandler.js";
import { getDailyAppointments } from "../controllers/admin/getDailyHandler.js";

const router = express.Router();

router.route('/admin-get-appointments')
  .get(verifyFirebaseToken, adminGetAll);

router.route('/get-daily-appointments')
  .get(verifyFirebaseToken, getDailyAppointments);

export default router;