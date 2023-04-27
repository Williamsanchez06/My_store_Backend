const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { db } = require('./../config/config');

class ProductService {

  constructor() {
    this.productos = [];
    this.generate();
  }

  async generate() {

    const limit = 100;
    for (let i = 0; i < limit; i++) {

      this.productos.push({
        id : faker.datatype.uuid(),
        name : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(), 10),
        Image : faker.image.imageUrl(),
        isBlock : faker.datatype.boolean(),
      })

    }

  }

  async create( data ) {

    const newProduct = await db.models.Product.create( data );
    return newProduct;

  }

  async find( query ) {

    const options = {
      include : ['category'],
      where : {}
    }

    const { limit, offset, price, price_min, price_max } = query;

    if(  limit && offset ) {
      options.limit = parseInt( limit );
      options.offset = parseInt( offset );
    }

    if ( price ) {
      options.where.price = price;
    }

    if ( price_min && price_max ) {
      options.where.price = {
        [ Op.gte ] : price_min,
        [ Op.lte ] : price_max,
      }
    }

    const productos = await db.models.Product.findAll( options );
    return productos;

  }

  async findOne(id) {

    const producto = await db.models.Product.findByPk(id);

    if( !producto ) {
      throw boom.notFound( 'Producto no Encontrado');
    }

    // if ( producto.isBlock ) {
    //   throw boom.conflict( 'Producto esta Bloqueado');
    // }

    return producto;
  }

  async update( id , changes ) {

    // const update = this.findOne( id );
    // const index = this.productos.findIndex( item => item.id === id );

    // if( index === -1 ) {
    //   throw boom.notFound( 'Producto no Encontrado');
    // }

    // const producto  = this.productos[index];
    // this.productos[index] = {
    //   ...producto,
    //   ...changes,
    // }

    const model = await this.findOne(id);
    const rta = await model.update( changes );
    return rta;

    // return this.productos[index];

  }

  async delete( id ) {

    const index = this.productos.findIndex( item => item.id === id );

    if( index === -1 ) {
      throw boom.notFound( 'Producto no Encontrado');
    }

    await this.productos.splice( index , 1);
    return { id };

  }

}

module.exports = ProductService;
