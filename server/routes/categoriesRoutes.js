import express from 'express';
import { deleteBookCategory, getAllCategories, getSingleCategoryBooks, updateBookCategory } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/getCategories', getAllCategories);
categoriesRouter.get('/getCategoryBooks/:id', getSingleCategoryBooks);
categoriesRouter.put('/updateBookCategory', updateBookCategory);
categoriesRouter.delete('/deleteBookCategory/:id', deleteBookCategory);


export default categoriesRouter;


