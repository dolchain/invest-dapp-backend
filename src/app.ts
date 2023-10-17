import express, { Application } from 'express';
import http404 from '@components/404/404.router';
import constants from '@config/constants';
import errorHandling from '@core/middleware/errorHandling.middleware';
import uniqueReqId from '@core/middleware/uniqueReqId.middleware';
import api from 'router';
import cors from 'cors';
import httpContext from 'express-http-context';
import morgan from 'morgan';

const app: Application = express();

// Initialise context for each request
app.use(httpContext.middleware);

// Generate a unique id for each request
app.use(uniqueReqId);

// Support application/json and application/x-www-form-urlencoded type post data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// Access API via the specified API_ROOT_PATH
app.use(constants.API_ROOT_PATH, api);

// Handle 404 errors
app.use(http404);

// CORS
app.use(cors());

// Log all requests in the Apache combined format
app.use(morgan('combined'));

// Sanitise user input
app.use(require('sanitize').middleware);

// Error handling
app.use(errorHandling);

export default app;