import JWT from 'jsonwebtoken';

const userAuth = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
next('Authentication token is missing or invalid');
  }
   
  const token = authHeader.split(' ')[1];
  
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name,  role: payload.role }; // Assuming the payload contains userId, name, and role
    next();
  } catch (error) {
    next('Authentication token is invalid or expired');
  }
}

export default userAuth;