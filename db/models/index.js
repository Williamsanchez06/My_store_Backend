const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema } = require('./customerModel');
const { Category, CategorySchema } = require('./categoryModel');
const { Product, ProductSchema } = require('./productoModel');
const { Order, OrderSchema } = require('./orderModel');
const { OrderProduct, OrderProductSchema } = require('./order-product');

function setupModels( db ) {

  User.init( UserSchema , User.config( db ) );
  Customer.init( CustomerSchema , Customer.config( db ) );
  Product.init( ProductSchema , Product.config( db ) );
  Category.init( CategorySchema , Category.config( db ) );
  Order.init( OrderSchema , Order.config( db ) );
  OrderProduct.init( OrderProductSchema , OrderProduct.config( db ) );

  User.associate(db.models);
  Customer.associate(db.models);
  Product.associate(db.models);
  Category.associate(db.models);
  Order.associate(db.models);
  // OrderProduct.associate(db.models);

}

module.exports = setupModels;
