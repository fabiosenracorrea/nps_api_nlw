import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import createConnection from './database';

import appRoutes from './routes';
import errorHandler from './middlewares/errorHandler';

createConnection();

const server = express();

server.use(express.json());

server.use(appRoutes);

server.use(errorHandler);

export default server;
