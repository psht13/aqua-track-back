import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { env } from './utils/env.js';
import { pinoConfig } from './utils/config.js';

import router from './routers/index.js';

import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { notFoundHandlerMiddleware } from './middlewares/not-found-handler.middleware.js';

const PORT = env('PORT', 3000);
const jsonParser = express.json();

export const setupServer = () => {
  const app = express();
  app.use('/api-docs', swaggerDocs());
  app.use(cors());

  app.use(cookieParser());
  app.use(jsonParser);
  app.use(pino(pinoConfig));

  app.use(router);

  app.use('*', notFoundHandlerMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is available on port ${PORT}`);
  });
};
