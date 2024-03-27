export function validateEntitlements(accessRights, projectId, group, entitlementId, userRole) {
    let value = false;
    if (accessRights && accessRights.length > 0) {
      const projectAccessRights = accessRights.filter(a => a.projectId === projectId);
      if (projectAccessRights.length > 0) {
        for (let i = 0; i < projectAccessRights.length; i++) {
          if (projectAccessRights[i].group === group && projectAccessRights[i].entitlementId === entitlementId) {
            value = true;
            break;
          }
        }
      } else {
        if (userRole !== "user") {
          value = true;
        }
      }
    }
    return value;
  }