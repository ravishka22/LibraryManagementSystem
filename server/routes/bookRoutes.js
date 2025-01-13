import express from 'express';
import { addBook, deleteBook, getBook, getBooks, getCategories, updateBook } from '../controllers/booksController.js';

const booksRouter = express.Router();

booksRouter.get('/getBooks', getBooks);
booksRouter.get('/getBook/:id', getBook);
booksRouter.post('/addBook', addBook);
booksRouter.put('/updateBook/:id', updateBook);
booksRouter.delete('/deleteBook/:id', deleteBook);
booksRouter.get('/getCategories', getCategories);


export default booksRouter;