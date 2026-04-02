import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_dev_secret_key_reedu';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode the JWT token mapped to MongoDB User
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

      // Append the valid user payload into Request object to distribute downwards
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true }
      });

      if (!req.user) {
         res.status(401).json({ success: false, message: 'Not authorized, user missing in MongoDB DB.' });
         return;
      }
      
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error);
      res.status(401).json({ success: false, message: 'Not authorized, token strictly failed verification.' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, completely missing Bearer token.' });
  }
};
