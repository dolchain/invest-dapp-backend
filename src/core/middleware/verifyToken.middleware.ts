import supabase from '@config/supabase';
import { throwInvalidTokenError } from '@core/utils/tokenUtilities';
import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    supabase.auth
      .getUser(bearerToken)
      .then((user) => {
        if (user) {
          // Call next middleware
          return next();
        }
        return throwInvalidTokenError();
      })
      .catch(() => {
        throwInvalidTokenError();
      });
  } else {
    throwInvalidTokenError();
  }
};

export default verifyToken;