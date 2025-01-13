import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';

import database from './config/database.js';
import authRouter from './routes/authRoutes.js';
import booksRouter from './routes/bookRoutes.js';
import usersRouter from './routes/userRoutes.js';
import readingListRouter from './routes/readingListRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));



app.get('/', (req, res) => {
    res.send('Server is working');
});

app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/readingList', readingListRouter);
app.use('/api/categories', categoriesRouter);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

