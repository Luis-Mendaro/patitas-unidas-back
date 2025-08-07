function authorizeRoles(allowedRoles = []) {
  return (req, res, next) => {
    const allowedRolesDictionary = { admin: 100, shelter: 200, user: 300 };
    const allowedRoleCodes = allowedRoles.map((role) => allowedRolesDictionary[role]);
    const userRole = req.auth?.roleCode;

    if (!userRole || !allowedRoleCodes.includes(userRole)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
}

module.exports = authorizeRoles;
