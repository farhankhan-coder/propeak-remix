import User from '../../models/user';
import Project from '../../models/project/project-model';
import Task from '../../models/task/task-model'; // Import the Task model

export const getMonthlyUserReport = async (reportParams, projectId) => {
    try {
        // Assuming reportParams contains necessary filtering information
        // Find the project by projectId
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        // Assuming User model has appropriate fields to generate the report
        const users = await User.find({ projectId: project._id });

        // Generate the monthly report for each user
        const monthlyReports = users.map(async (user) => {
            // Logic to generate monthly report for each user based on reportParams
            // Example: const userReport = await generateMonthlyReport(user, reportParams);
            const userReport = {}; // Placeholder for the actual report

            return { user, report: userReport };
        });

        return { response: monthlyReports, err: null };
    } catch (err) {
        console.error('Error fetching monthly user report:', err);
        return { response: null, err };
    }
};
