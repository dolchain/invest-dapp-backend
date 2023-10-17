import Joi from 'joi';
import 'dotenv/config';

/*
All environment variables used by the server should be defined in this file.

To define a new environment variable:

1. Add the variable to the .env.local file;
2. Provide validation rules for your environment in environmentSchema;
3. Make it visible outside of this module using the export section;
4. Access your env variable only via this environment file.

Do not use process.env object outside of this file.
*/

const environmentSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development')
      .required(),
    PORT: Joi.number().default(8000),

    // Database
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SYNC: Joi.boolean().required(),
    DB_LOGS: Joi.boolean().required(),

    // Redis
    REDIS_PASSWORD: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),

    // Rollbar
    ROLLBAR_ACCESS_TOKEN: Joi.string(),

    // Sendgrid
    SENDGRID_API_KEY: Joi.string().required(),

    // Stripe
    STRIPE_PUBLISHABLE_KEY: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_RETURN_URL: Joi.string().required(),

    // Supabase
    SUPABASE_URL: Joi.string().required(),
    SUPABASE_KEY: Joi.string().required(),
    SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
    SUPABASE_BUCKET_NAME: Joi.string().required(),
  })
  .unknown(true);

const { value: env, error } = environmentSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`,
  );
}

// Map environment variables and make them visible outside module
export default {
  NODE_ENV: env.NODE_ENV as string,
  PORT: env.PORT as number,

  // Database
  DB_HOST: env.DB_HOST as string,
  DB_PORT: env.DB_PORT as number,
  DB_NAME: env.DB_NAME as string,
  DB_USERNAME: env.DB_USERNAME as string,
  DB_PASSWORD: env.DB_PASSWORD as string,
  DB_SYNC: env.DB_SYNC as boolean,
  DB_LOGS: env.DB_LOGS as boolean,

  // Redis
  REDIS_PASSWORD: env.REDIS_PASSWORD as string,
  REDIS_HOST: env.REDIS_HOST as string,
  REDIS_PORT: env.REDIS_PORT as number,

  // Rollbar
  ROLLBAR_ACCESS_TOKEN: env.ROLLBAR_ACCESS_TOKEN as string,

  // Sendgrid
  SENDGRID_API_KEY: env.SENDGRID_API_KEY as string,

  // Stripe
  STRIPE_PUBLISHABLE_KEY: env.STRIPE_PUBLISHABLE_KEY as string,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY as string,
  STRIPE_RETURN_URL: env.STRIPE_RETURN_URL as string,

  // Supabase
  SUPABASE_URL: env.SUPABASE_URL as string,
  SUPABASE_KEY: env.SUPABASE_KEY as string,
  SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY as string,
  SUPABASE_BUCKET_NAME: env.SUPABASE_BUCKET_NAME as string,
};