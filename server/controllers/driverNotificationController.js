import Notification from "../models/Notification.js";

// ======================================
// GET DRIVER NOTIFICATIONS
// GET /api/driver/notifications
// ======================================
export const getDriverNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      role: "driver",
    })
      .sort({ createdAt: -1 })
      .populate("relatedDelivery", "orderId customerName");

    const unread = notifications.filter(
      (item) => !item.isRead
    ).length;

    res.status(200).json({
      success: true,
      unread,
      notifications,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch notifications.",
    });

  }
};

// ======================================
// MARK AS READ
// PATCH /api/driver/notifications/:id/read
// ======================================
export const markNotificationRead = async (req, res) => {

  try {

    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================================
// MARK ALL AS READ
// PATCH /api/driver/notifications/read-all
// ======================================
export const markAllNotificationsRead = async (
  req,
  res
) => {

  try {

    await Notification.updateMany(
      {
        recipient: req.user._id,
        role: "driver",
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};