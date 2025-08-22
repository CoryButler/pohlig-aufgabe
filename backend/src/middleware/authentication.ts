import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { stati } from '../config/config';
import { devProcess } from '../models/auth';


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(stati.UNAUTHORIZED);
    return;
  }

  jwt.verify(token, devProcess.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err)
      res.sendStatus(stati.FORBIDDEN);
      return;
    }

    console.log('user', user);
    //@ts-ignore
    req.user = user;
    next();
  })
}