import express from 'express';
import { addBookToReadingList, getReadingList, removeBookFromReadingList } from '../controllers/redingListController.js';

const readingListRouter = express.Router();

readingListRouter.get('/getReadingList/:id', getReadingList);
readingListRouter.post('/addBookToReadingList', addBookToReadingList);
readingListRouter.delete('/removeBook/:id', removeBookFromReadingList);



export default readingListRouter;