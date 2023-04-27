const boom = require('@hapi/boom');
const { db } = require('../config/config');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await db.models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await db.models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await db.models.User.create( data.user );
    const newCustomer = await db.models.Customer.create({
      ...data,
      userId : newUser.id
    });

    //Tambien se puede hacer de esta manera ya que esta relacionada las tablas
    // const newCustomer = await models.Customer.create(data, {
    //   include: ['user']
    // });

    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
