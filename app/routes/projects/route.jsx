import ProjectMain from "../../Components/project/project-main";





export async function action({ request, params }) {
    const projectId = params.projectId; 
    const userInfo = request.locals.userInfo; 
    
    try {
      const auditLogData = await getAuditLog(projectId, userInfo);
      return json(auditLogData);
    } catch (error) {
      console.error('Error in action:', error);
      return json({ error: error.message }, { status: 500 });
    }
  }