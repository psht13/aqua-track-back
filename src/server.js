import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { pinoConfig } from './utils/config.js';

import router from './routers/index.js';

import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { notFoundHandlerMiddleware } from './middlewares/not-found-handler.middleware.js';

const PORT = env('PORT', 3000);
const jsonParser = express.json();

export const setupServer = () => {
  const app = express();

  const allowedOrigins = [
    "http://localhost:5173",
    "https://aqua-track-front.up.railway.app",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

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
