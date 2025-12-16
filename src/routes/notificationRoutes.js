// get notifications for a user
import express from "express";
import {
  getNotificationsForUser,
  readNotification,
  deleteNotification,
} from "../controllers/controller.js";

const router = express.Router();

//create is only done via the message queue

//get notifications for a user

router.get("/notifications/:userId", getNotificationsForUser);

//read a notifiaction

router.put("/read/:notificationId", readNotification);
//delete a notification

router.delete("/delete/:notificationId", deleteNotification);

export default router;
