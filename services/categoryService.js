// const boom = require('@hapi/boom');

const { db } = require('./../config/config');

class CategoryService {

  constructor(){
  }

  async create(data) {
    const newCategory = await db.models.Category.create( data );
    return newCategory;
  }

  async find() {

    const categories = await db.models.Category.findAll();
    return categories;

  }

  async findOne(id) {

    const category = await db.models.Category.findByPk( id, {
      include : ['products']
    } );
    return category;

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

module.exports = CategoryService;
