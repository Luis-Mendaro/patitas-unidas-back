function authorizeRoles(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.auth?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
}

module.exports = authorizeRoles;
