import supabase from '@config/supabase';
import logger from '@core/utils/logger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import environment from '@config/environment';

const createUser = async (req: Request, res: Response) => {
  const newUser = await supabase.auth.admin.createUser({
    email: req.body.email,
    password: req.body.password,
    user_metadata: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });

  if (newUser.error) {
    logger.error('Error creating user: ', newUser.error);
    res.status(httpStatus.BAD_REQUEST);
    res.send({ message: 'Bad Request' });
    return;
  }

  res.status(httpStatus.CREATED);
  res.json(newUser.data);
};

const getUser = async (req: Request, res: Response) => {
  const user = await supabase.auth.admin.getUserById(req.params.id);

  if (user.error) {
    logger.error('Error getting user: ', user.error);
    res.status(httpStatus.BAD_REQUEST);
    res.send({ message: 'Bad Request' });
    return;
  }

  res.status(httpStatus.OK);
  res.json(user.data);
};

const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await supabase.auth.admin.updateUserById(req.params.id, {
    email: req.body.email,
    password: req.body.password,
    user_metadata: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });

  if (updatedUser.error) {
    logger.error('Error updating user: ', updatedUser.error);
    res.status(httpStatus.BAD_REQUEST);
    res.send({ message: 'Bad Request' });
    return;
  }

  res.status(httpStatus.OK);
  res.json(updatedUser.data);
};

const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await supabase.auth.admin.deleteUser(req.params.id);

  if (deletedUser.error) {
    logger.error('Error deleting user: ', deletedUser.error);
    res.status(httpStatus.BAD_REQUEST);
    res.send({ message: 'Bad Request' });
    return;
  }

  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Deleted user' });
};

export { createUser, getUser, updateUser, deleteUser };