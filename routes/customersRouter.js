const express = require('express');


const validationHandler = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customerSchema');

const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

const router = express.Router();

router.get('/', getCustomers );

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  createCustomer
);

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  updateCustomer
);

router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  deleteCustomer
);

module.exports = router;
