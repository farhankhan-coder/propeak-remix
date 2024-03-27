import { serviceHost } from '../../common/const';
import ServiceRequest from '../../utils/service-request';
import User from '../../models/user/user-model'; 
import Task from '../../models/task/task-model'; 

export const getUserTaskCountReport = async (reportParams) => {
    try {
        // Assuming reportParams contains necessary data like projectId, date range, etc.
        const { projectId, fromDate, toDate } = reportParams;

        // Fetch all users from the User model
        const users = await User.find().exec();

        // Create an object to store task counts for each user
        const userTaskCounts = {};

        // Loop through each user to count tasks assigned to them
        for (const user of users) {
            // Count tasks for the current user based on the Task model
            const taskCount = await Task.countDocuments({
                assignedUser: user._id, // Assuming the Task model has a field named assignedUser storing the user ID
                projectId,
                createdAt: { $gte: fromDate, $lte: toDate } // Assuming createdAt field represents task creation date
            }).exec();

            // Store the task count for the current user
            userTaskCounts[user._id] = taskCount;
        }

        // Return the user task count report
        return { response: userTaskCounts, err: null };
    } catch (err) {
        console.error('Error fetching user task count report:', err);
        return { response: null, err };
    }
};
