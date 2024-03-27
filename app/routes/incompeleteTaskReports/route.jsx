import { useLoaderData } from "@remix-run/react";
import IncompeleteTaskCountReport from "../../Components/reports/incompelete_task_count-report";
import {getIncompleteTaskCountReport} from "../../Services/reports/incompelete_task_reports-service";
import { json } from "@remix-run/node";
export const loader = async ({ params }) => {
    try {
        const { data, err } = await getIncompleteTaskCountReport(params.reportParams); // Call the function with reportParams
        console.log(data, "response .....");
        if (err) {
            console.error('Error fetching incomplete task count report:', err);
            return json({ error: 'Failed to load incomplete task count report' }, { status: 500 });
        }
        return json({ incompleteTaskCountReport: data });
    } catch (error) {
        console.error('Error in loader function:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export default function IncompeleteTaskCountReportComponent(){
    const {incompleteTaskCountReport}=useLoaderData()
    return(
        <div>
            <IncompeleteTaskCountReport
            incompleteTaskCountReport={incompleteTaskCountReport}
            />
        </div>
    )
}