import { verify } from 'jsonwebtoken';

// A secret key for signing JWTs. In production, this should be
// an environment variable, not hardcoded.
const JWT_SECRET = 'your-very-secure-and-long-secret-key';

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
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded; // Add the decoded user payload to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}
