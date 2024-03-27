import Burndown from "../../models/burndown/burndown-model";
export const getProjectProgressReport = async (projectId) => {
  try {
    // Find burndown data by projectId
    const burndownData = await Burndown.find({ projectId });

    let resultArray = [];
    if (burndownData.length > 0) {
      for (let i = 0; i < burndownData.length; i++) {
        let d1 = new Date(burndownData[i].date);
        let date = dateUtil.DateToString(
          d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate()
        );

        let info = {
          projectId: burndownData[i].projectId,
          todo: burndownData[i].todo,
          inprogress: burndownData[i].inprogress,
          completed: burndownData[i].completed,
          todoStoryPoint: burndownData[i].todoStoryPoint,
          inprogressStoryPoint: burndownData[i].inprogressStoryPoint,
          completedStoryPoint: burndownData[i].completedStoryPoint,
          date: date,
        };
        resultArray.push(info);
      }
    }

    return { response: resultArray, err: null };
  } catch (err) {
    console.error("Error fetching project progress report:", err);
    return { response: null, err };
  }
};
