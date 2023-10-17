/* eslint-disable no-process-exit */
import { Server } from 'http';
import app from '@app';
import logger from '@core/utils/logger';
import errorHandler from 'core/utils/errorHandler';
import environment from '@config/environment';
// import AppDataSource from '@config/ormconfig';

// const { PORT } = environment;
const PORT = process.env.PORT || 8000

let server: Server;

server = app.listen(PORT, (): void => {
  logger.info(`Server listening on port ${PORT}`);
});
// AppDataSource.initialize()
//   .then(async () => {
//     server = app.listen(PORT, (): void => {
//       logger.info(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     logger.error('TypeORM connection error: ', error);
//   });

const exitHandler = (): void => {
  if (app) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    exitHandler();
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});