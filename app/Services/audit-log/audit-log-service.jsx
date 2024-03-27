// app/services/audit-log-service.js

// Import necessary modules
import AuditLog from '../../models/auditlog/audit-log-model';
import { logError, logInfo } from '../../common/logger';

// Define a function to insert audit logs
export function insertAuditLog(oldValue, name, tableName, fieldname, value, updatedby, projectId) {
  try {
    let auditDate = new Date().toUTCString();
    let newAuditLogs = {
      name: name,
      projectId: projectId,
      tableName: tableName,
      fieldName: fieldname,
      oldValue: oldValue,
      newValue: value,
      updatedBy: updatedby,
      updatedOn: auditDate,
    };
    logInfo("insertAuditLog newAuditLogs", newAuditLogs);
    let auditLog = new AuditLog(newAuditLogs);
    auditLog.save(function (err) {
      if (err) {
        logError("insertAuditLog err", err);
      }
    });
  } catch (e) {
    logError("insertAuditLog e", e);
  }
}
