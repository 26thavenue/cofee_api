import { Request, Response, NextFunction } from 'express';

// isAdmin Middleware
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is an admin
  if (req.body.isAdmin) {
    next(); // User is an admin, proceed to the next middleware or route
  } else {
    res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
};

export default  isAdmin