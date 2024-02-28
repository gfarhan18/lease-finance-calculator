// middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  user: {
    id: number;
    email: string;
    // Add more user properties if needed
  };
}

// Extend the NextApiRequest interface
declare module 'next' {
  interface NextApiRequest {
    user?: DecodedToken['user']; // Define user property as optional
  }
}

export function requireAuthentication(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  // Check for token in headers, cookies, or request body
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = (decoded as DecodedToken).user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
