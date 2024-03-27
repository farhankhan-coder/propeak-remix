import { serviceHost } from '../../common/const';
import ServiceRequest from '../../utils/service-request';
import User from '../../models/user/user-model'; // Import the User model
import Task from '../../models/task/task-model'; // Import the Task model

export const getUserPerformanceReportData = async (filterData) => {
    try {
        const { userId, projectId, year, month, dateFrom, dateTo } = filterData;

        // Assuming you have a method in your User model to find a user by userId
        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }

        // Assuming your Task model has a method to query tasks based on projectId and date range
        const tasks = await Task.find({
            projectId,
            createdAt: { $gte: dateFrom, $lte: dateTo } // Assuming createdAt field represents the task creation date
        }).exec();

        // Assuming you have logic to calculate user's performance based on tasks retrieved
        const performanceData = calculatePerformance(user, tasks);

        return { response: performanceData, err: null };
    } catch (err) {
        console.error('Error fetching user performance report data:', err);
        return { response: null, err };
    }
};

// Example function to calculate user's performance based on tasks
function calculatePerformance(user, tasks) {
    // Your logic to calculate performance based on user and tasks
    // This is just a placeholder, replace it with your actual calculation logic
    const performanceData = {
        userId: user._id,
        userName: user.name,
        tasksCompleted: tasks.length,
        // Other performance metrics...
    };
    return performanceData;
}
