import supabase from '@config/supabase';
import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from './appError';
import logger from './logger';

export const throwInvalidTokenError = () => {
  logger.error(
    'Missing or invalid bearer token in request authorization header',
  );
  throw new AppError(
    httpStatus.UNAUTHORIZED,
    'Access forbidden - Invalid Token',
  );
};

export const getBearerTokenFromRequest = (req: Request) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    return bearer[1];
  }

  return throwInvalidTokenError();
};

export const getUserByToken = async (req: Request) => {
  const bearerToken = getBearerTokenFromRequest(req);

  const { data: user, error } = await supabase.auth.getUser(bearerToken);

  if (error) {
    throw error;
  }

  return user;
};