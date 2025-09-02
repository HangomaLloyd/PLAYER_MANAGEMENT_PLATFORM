import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// This is our in-memory "database" for demonstration purposes.
// In a real application, you would replace this with a database model.
const users = [];

// A secret key for signing JWTs. In production, this should be
// an environment variable, not hardcoded.
const JWT_SECRET = 'your-very-secure-and-long-secret-key';

// Handle user registration
export const signup = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }

  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user object
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log(`New user signed up: ${email}`);
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'An unexpected error occurred during signup.' });
  }
};

// Handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  try {
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log(`User logged in: ${email}`);
    res.json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'An unexpected error occurred during login.' });
  }
};
