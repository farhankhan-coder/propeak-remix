import ProjectProgressReport from "../../Components/reports/project-progress-report";
import {getProjectProgressReport} from "../../Services/reports/project-progress-reports-service"
import { json, useLoaderData } from "@remix-run/react";
export const loader = async ({ params }) => {
    try {
        const { response, err } = await getProjectProgressReport(params.projectId);
        console.log(response, "response ...");
        if (err) {
            console.error('Error fetching project progress report:', err);
            return json({ error: 'Failed to load project progress report' }, { status: 500 });
        }
        return json({ projectProgressReport: response });
    } catch (error) {
        console.error('Error in loader function:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
export default function ProjectProgressReportComponent(){
    const {projectProgressReport}=useLoaderData();
    console.log(projectProgressReport)
    return(
        <div>
            <ProjectProgressReport
            projectProgressReport={projectProgressReport}
            />
        </div>
    )
}