import TaskList from "../../Components/tasks/task-list";
import Task from "../../Components/tasks/task";
import { getAllTasks } from "../../Services/task/task-service";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
export async function loader() {
    try {
      const tasks = await getAllTasks();
      console.log(tasks,"data is here ")
      return json({ tasks });
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  };
export default function taskComponent(){
  const {tasks}=useLoaderData()
  console.log(tasks,"tasks.........")
    return(
        <div>
            <TaskList
            />
            {/* <Task/> */}
        </div>
    )
}