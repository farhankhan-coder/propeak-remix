import AuditLog from "../../Components/audit-log/audit-log";
import { getProjectAuditLog } from "../../Services/project/project-service";
import { json, useLoaderData } from "@remix-run/react";
export const loader = async ({ params }) => {
  const { projectId } = params;

  try {
    const { auditLog, err } = await getProjectAuditLog(projectId);
    console.log(auditLog, " audit log data ");
    if (err) {
      console.error("Error getting project audit log:", err);
      return json(
        { error: "Failed to get project audit log." },
        { status: 500 }
      );
    }

    return json({ auditLog: auditLog });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

export default function AuditLogComponent() {
  const {auditLog}=useLoaderData();
  return (
    <div>
      <AuditLog
      auditLog={auditLog} />
    </div>
  );
}
