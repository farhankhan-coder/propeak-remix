import Project from "../../models/project/project-model"
export const getIncompleteTaskCountReport = async (reportParams) => {
    try {
        const userCondition = {
            isDeleted: false,
        };

        const projectCond = {
            $match: userCondition,
        };

        const projectFields = {
            $project: {
                _id: 1,
                "tasks.title": 1,
                "tasks._id": 1,
                "tasks.userId": 1,
                "tasks.startDate": 1,
                "tasks.endDate": 1,
                "tasks.isDeleted": 1,
                "tasks.status": 1,
                "tasks.storyPoint": 1,
                "tasks.dateOfCompletion": 1,
            },
        };

        const unwindTasks = {
            $unwind: "$tasks",
        };

        const condition = {
            $or: [
                { "tasks.status": { $eq: "new" } },
                { "tasks.status": { $eq: "inprogress" } },
            ],
            "tasks.isDeleted": false,
        };

        const taskFilterCondition = {
            $match: condition,
        };

        const result = await Project.aggregate([
            projectCond,
            projectFields,
            unwindTasks,
            taskFilterCondition,
        ]);

        const tasksByUserId = {};

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].tasks.userId !== "") {
                    const userId = result[i].tasks.userId;
                    if (!tasksByUserId[userId]) {
                        tasksByUserId[userId] = {
                            newtaskCount: 0,
                            inprogresstaskCount: 0,
                        };
                    }
                    if (result[i].tasks.status === "new") {
                        tasksByUserId[userId].newtaskCount++;
                    } else if (result[i].tasks.status === "inprogress") {
                        tasksByUserId[userId].inprogresstaskCount++;
                    }
                }
            }
        }

        return { data: tasksByUserId, err: null };
    } catch (err) {
        console.error('Error fetching incomplete task count report:', err);
        return { data: null, err };
    }
};


