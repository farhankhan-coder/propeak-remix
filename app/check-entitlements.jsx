const checkEntitlements = (userRole) => {
  if (!userRole) {
    return false;
  } else if (userRole !== "admin" && userRole !== "owner") {
    return false;
  } else {
    return true;
  }
};

const checkEntitlementsForUserRole = (userRole) => {
  if (!userRole) {
    return false;
  } else {
    return true;
  }
};

export default {
  checkEntitlements: checkEntitlements,
  checkEntitlementsForUserRole: checkEntitlementsForUserRole,
};
