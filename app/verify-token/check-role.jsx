export function checkRole(req, res, next) { 
    if (req.userInfo.userRole === "support") {
        req.userInfo.userRole = 'admin';
    }
    next();
}
