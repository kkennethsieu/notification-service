import * as notificationModel from "../models/models.js";

export const getNotificationsForUser = (req, res) => {
  const { userId } = req.params;
  try {
    const data = notificationModel.getNotificationsForUser(userId);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ error: `No notifications found for user ${userId}` });
    }

    return res
      .status(200)
      .json({ data, message: `Get notifications for user ${userId}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching notifications" });
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
