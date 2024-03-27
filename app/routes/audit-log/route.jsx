import AuditLog from "../../Components/audit-log/audit-log";
import { getAuditLog } from "../../Services/project/project-service";
import { json, useLoaderData } from "@remix-run/react";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";

export const loader = async ({ params }) => {
  const { projectId } = params;

  try {
    const { auditLog, err } = await getAuditLog(projectId);
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
            import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
      <Header />
      <Menu />
      {/* <Summary /> */}
      <Footer />
      <AuditLog
      auditLog={auditLog} />
    </div>
  );
}
