const express = require('express');

const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orderSchema');
const validationHandler = require('../middlewares/validatorHandler');
const { getOrderId, createOrder, addItem } = require('../controllers/orderController');

const router = express.Router();

router.get('/:id',
validationHandler( getOrderSchema, 'params' ),
getOrderId
)

router.post('/',
validationHandler( createOrderSchema, 'body' ),
createOrder
)

router.post('/add-item',
validationHandler( addItemSchema, 'body' ),
addItem
)

module.exports = router;
