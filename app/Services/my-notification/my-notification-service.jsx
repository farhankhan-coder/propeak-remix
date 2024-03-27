import MyNotification from "../../models/my-notification/my-notification"

export async function getMyNotifications(req) {
    try {
        const userId = req.userInfo.userId;
        const result = await MyNotification.find({
            //  userId: userId, read: false 
            });
        logInfo(result.length, "getMyNotifications result ");
        return json(result);

    } catch (err) {
        logError("getMyNotifications err", err);
        return json({ error: "An error occurred while fetching notifications" }, 500);
    }
}

export async function markNotificationRead(req) {
    try {
        // console.log("req.params.myNotificationId",req.params.myNotificationId);
        const result = await MyNotification.findOneAndUpdate(
            { _id: req.body.myNotificationId },
            { $set: { 'read': true } },
            { 'new': true }
        );
        logInfo(result.length, "markNotificationRead result");
        return json({
            data: result,
            msg: "Updated successfully"
        });

    } catch (err) {
        logError("markNotificationRead err", err);
        return json({ error: "An error occurred while marking notification as read" }, 500);
    }
}
