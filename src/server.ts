import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import './database';

import appRoutes from './routes';
import errorHandler from './middlewares/errorHandler';

const server = express();

server.use(express.json());

server.use(appRoutes);

server.use(errorHandler);

server.listen(3333, () => console.log('Server Started!'));
