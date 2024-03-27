import TaskReport from "../../Components/reports/task-report";
import {getMonthlyTaskReport} from "../../Services/reports/task-reports-service";
import { json, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
    try {
        const { data, err } = await getMonthlyTaskReport(params.reportParams); // Call the function with reportParams
        console.log(data, "response .....");
        if (err) {
            console.error('Error fetching monthlyTaskReport  count report:', err);
            return json({ error: 'Failed to load monthlyTaskReport  count report' }, { status: 500 });
        }
        return json({ monthlyTaskReport: data });
    } catch (error) {
        console.error('Error in loader function:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
export default function TaskReportComponent(){
    const {monthlyTaskReport}=useLoaderData();
    return (
        <div>
            <TaskReport
            monthlyTaskReport={monthlyTaskReport}
            />
        </div>
    )
}