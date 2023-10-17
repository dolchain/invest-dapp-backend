import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const createUserValidation: ValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

export default createUserValidation;