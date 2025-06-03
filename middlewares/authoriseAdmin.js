
export const authoriseAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || user.role != true) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.',
      
    });
  }

  next();
}

