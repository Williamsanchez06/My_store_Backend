
const OrderService = require('./../services/orderService');

const service = new OrderService();

const getOrderId = async (req, res, next) => {

  try {
    const { id } = req.params;
    const producto = await service.findOne( id );
    return res.status( 200 ).json( producto );

  } catch (error) {
    next( error );
  }

}

const createOrder = async( req, res, next) => {

  try {

    const body = req.body;
    return res.status( 201 ).json( await service.create( body ) )

  } catch (error) {
    next(error);
  }

}

const addItem = async( req, res, next) => {

  try {
    const body = req.body;
    const newItem = await service.addItem( body );
    return res.status( 201 ).json( newItem );

  } catch (error) {
    next(error);
  }

}


module.exports = {
  getOrderId,
  createOrder,
  addItem
}
