import jwt from 'jsonwebtoken';
const { verify } = jwt;

// JWT Secret validation function
const getJWTSecret = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return JWT_SECRET;
};

// Middleware to verify the JWT token
export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Malformed token.' });
  }

  try {
    const decoded = verify(token, getJWTSecret());
    req.user = decoded; // Add the decoded user payload to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}

// Middleware to check if user is super admin
export function requireSuperAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Super admin access required.' });
  }
  
  next();
}

// Middleware to check if user is club admin
export function requireClubAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  if (req.user.role !== 'clubadmin') {
    return res.status(403).json({ message: 'Club admin access required.' });
  }
  
  next();
}

// Middleware to check if user is either super admin or club admin
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  if (!['superadmin', 'clubadmin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  
  next();
}
