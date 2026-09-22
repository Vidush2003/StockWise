/**
 * Role-Based Access Control (RBAC) middleware.
 * Enforces backend permission checks for specific user roles.
 * 
 * Usage: requireRole('admin') or requireRole('admin', 'staff')
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user.role}' is not authorized to perform this operation`
      });
    }

    next();
  };
};

module.exports = { requireRole };
