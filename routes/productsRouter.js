const express = require('express');

const validatorHandler = require('./../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/productSchema');
const { getProduct, getProductId, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');

const router = express.Router();

router.get('/',
validatorHandler( queryProductSchema, 'query' ),
getProduct
)

router.get('/filter', ( req, res ) => {
    res.send('Yo soy un Filter');
})

router.get('/:id',
validatorHandler( getProductSchema, 'params' ),
getProductId
)

router.post('/',
validatorHandler( createProductSchema, 'body' ),
createProduct
)

router.patch('/:id',
validatorHandler( getProductSchema, 'params' ),
validatorHandler( updateProductSchema, 'body' ),
updateProduct
)

router.delete('/:id',
validatorHandler( getProductSchema, 'params' ),
deleteProduct
)

module.exports = router;
