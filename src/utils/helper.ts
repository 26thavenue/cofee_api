import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

const secretKey = process.env.SECRET_KEY

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword.toString();
}

// // // Function to generate JWT
// function generateToken(user:string) {
//   return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
// }

// Function to compare a plain text password with a hashed password
export async function comparePasswords(plainPassword:string, hashedPassword:string) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
   
    next();
  });
}


const roleRegex = /^(admin|employee)$/i;

export const validateUserFields = (name:string, email:string, password:string, role?:string ) => {
    if(!name || !email || !password || role ){
        return false;
    }
    return true;
}

export function validateEmail(email:string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// const isValidRole = roleRegex.test(role.toLowerCase());