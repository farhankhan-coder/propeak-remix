export const getActiveUsersReportLoader = async ({ params }) => {
    const { reportParams, projectId } = params;
  
    try {
      const { response, err } = await getActiveUsersReport(reportParams, projectId);
  
      if (err) {
        console.error("Error fetching active users report:", err);
        return json({ error: "Failed to fetch active users report." }, { status: 500 });
      }
  
      return json({ reportData: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const getIncompleteTaskCountReportLoader = async ({ params }) => {
    const { reportParams } = params;
  
    try {
      const { response, err } = await getIncompleteTaskCountReport(reportParams);
  
      if (err) {
        console.error("Error fetching incomplete task count report:", err);
        return json({ error: "Failed to fetch incomplete task count report." }, { status: 500 });
      }
  
      return json({ incompleteTasks: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  export const getProjectProgressReportLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { response, err } = await getProjectProgressReport(projectId);
  
      if (err) {
        console.error("Error fetching project progress report:", err);
        return json({ error: "Failed to fetch project progress report." }, { status: 500 });
      }
  
      return json({ progressReport: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const getMonthlyTaskReportLoader = async ({ params }) => {
    const { reportParams, projectId } = params;
  
    try {
      const { response, err } = await getMonthlyTaskReport(reportParams, projectId);
  
      if (err) {
        console.error("Error fetching monthly task report:", err);
        return json({ error: "Failed to fetch monthly task report." }, { status: 500 });
      }
  
      return json({ monthlyTasks: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  export const getUserPerformanceReportDataLoader = async ({ params }) => {
    const { filterData } = params;
  
    try {
      const { response, err } = await getUserPerformanceReportData(filterData);
  
      if (err) {
        console.error("Error fetching user performance report data:", err);
        return json({ error: "Failed to fetch user performance report data." }, { status: 500 });
      }
  
      return json({ performanceData: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const getMonthlyUserReportLoader = async ({ params }) => {
    const { reportParams, projectId } = params;
  
    try {
      const { response, err } = await getMonthlyUserReport(reportParams, projectId);
  
      if (err) {
        console.error("Error fetching monthly user report:", err);
        return json({ error: "Failed to fetch monthly user report." }, { status: 500 });
      }
  
      return json({ monthlyReports: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  export const getUserTaskCountReportLoader = async ({ params }) => {
    const { reportParams } = params;
  
    try {
      const { response, err } = await getUserTaskCountReport(reportParams);
  
      if (err) {
        console.error("Error fetching user task count report:", err);
        return json({ error: "Failed to fetch user task count report." }, { status: 500 });
      }
  
      return json({ userTaskCounts: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
    
  