export const authoriseAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.'
    });
  }

  next();
};
