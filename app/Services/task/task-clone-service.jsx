import Task from '../../models/task/task-model';

export const addCloneTask = async (projectId, taskId) => {
    try {
        const clonedTask = await Task.findOne({ projectId, taskId });
        return { response: clonedTask, err: null };
    } catch (err) {
        console.error('Error cloning task:', err);
        return { response: null, err };
    }
};

