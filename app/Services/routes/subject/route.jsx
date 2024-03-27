import { useLoaderData } from "@remix-run/react";
import SubjectList from "../../Components/chat/subject-list";
import { getAllSubjects } from "../../Services/chat/chat-service";
//getAll Subject
import { json } from "@remix-run/react";
export const loader = async () => {
  try {
    const { subjects, err } = await getAllSubjects();
    console.log(subjects,"subject data ")
    if (err) {
      console.error("Error retrieving subjects:", err);
      return json({ error: "Failed to retrieve subjects." }, { status: 500 });
    }

    return json({ subjects: subjects });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

export default function Chat(){
    const {subjects}=useLoaderData()
    return(
        <div>
            <SubjectList
            subjects={subjects}
            />
        </div>
    )
}