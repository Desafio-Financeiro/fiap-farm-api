import 'module-alias/register';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './interfaces/http/routes';
import usersRouter from './interfaces/http/routes/users';
import errorHandler from './interfaces/http/ErroHandler';
import productRouter from '@/interfaces/http/routes/product';

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

app.use(errorHandler);

export default app;
