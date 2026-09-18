import Notification from "../models/Notification.js";

// ==========================================
// Get All Notifications
// ==========================================

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications.",
    });
  }
};

// ==========================================
// Notification Statistics
// ==========================================

export const getNotificationStats = async (req, res) => {
  try {
    const [
      total,
      unread,
      read,
      highPriority,
    ] = await Promise.all([
      Notification.countDocuments(),
      Notification.countDocuments({ isRead: false }),
      Notification.countDocuments({ isRead: true }),
      Notification.countDocuments({
        priority: "high",
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        read,
        highPriority,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch statistics.",
    });
  }
};

// ==========================================
// Mark Single Notification Read
// ==========================================

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(
      req.params.id
    );

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
      data: notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification.",
    });
  }
};

// ==========================================
// Mark All Notifications Read
// ==========================================

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update notifications.",
    });
  }
};

// ==========================================
// Delete Notification
// ==========================================

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification.",
    });
  }
};

// ==========================================
// Clear All Notifications
// ==========================================

export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All notifications cleared.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to clear notifications.",
    });
  }
};