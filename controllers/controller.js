import * as notificationModel from "../models/models.js";

export const getNotificationsForUser = (req, res) => {
  const { userId } = req.params;
  try {
    const data = notificationModel.getNotificationsForUser(userId);
    res
      .status(200)
      .json({ data, message: `Get notifications for user ${userId}` });
  } catch (error) {
    console.error(error);
  }
};

export const readNotification = (req, res) => {
  const { notificationId } = req.params;

  try {
  } catch (error) {}
};
export const deleteNotification = (req, res) => {
  const { notificationId } = req.params;
};
