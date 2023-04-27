const express = require('express');

const validatorHandler = require('./../middlewares/validatorHandler');

const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema');

const { getCategories, getCategoriesId, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories );

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  getCategoriesId
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  createCategory
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  deleteCategory
);

module.exports = router;
