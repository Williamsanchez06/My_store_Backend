
const ProductService = require('./../services/productService');
const service = new ProductService();

const getProduct = async (req, res, next) => {

  try {
     const products = await service.find( req.query );
     return res.json(products);
  } catch (error) {
     next(error);
  }

}

const getProductId = async (req, res, next) => {

  try {
    const { id } = req.params;
    return res.status( 200 ).json( await service.findOne( id ) );

  } catch (error) {
    next( error );
  }

}

const createProduct = async( req, res, next) => {

  try {
    const body = req.body;
    return res.status( 201 ).json( await service.create( body ) )

  } catch (error) {
    next(error);
  }

}

const updateProduct = async ( req, res, next) => {

  try {

    const { id } = req.params;
    const body = req.body;

    const producto = await service.update( id , body );

    return res.status( 200 ).json({
        message : 'Update ',
        ...producto
    })
  } catch (error) {
    next(error);
  }

}

const deleteProduct = async ( req, res) => {

  const { id } = req.params;
  const rta = await service.delete( id );

  return res.status( 204 ).json({
      message : 'Deleted',
      rta
    })

}

module.exports = {
  getProduct,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct
}
