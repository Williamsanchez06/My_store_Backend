
const { db } = require('./../config/config');

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await db.models.Order.create( data );
    return newOrder;
  }

  async addItem( data ) {
    const newOrderProduct = await db.models.OrderProduct.create( data );
    return newOrderProduct;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await db.models.Order.findByPk( id,{
      include : [{
        association : 'customer',
        include : [ 'user' ]
      },
      'items'
    ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
