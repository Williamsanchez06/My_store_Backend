const boom = require('@hapi/boom');
const { db } = require('./../config/config');

class UserService {

  constructor() { }

  async create( data ) {
    const newUser = await db.models.User.create( data );
    return newUser;
  }

  async find() {
    const rta = await db.models.User.findAll({
      include : ['customer']
    });
    return rta;
  }

  async findOne( id ) {
    const usuario = await db.models.User.findByPk( id );

    if( !usuario ) {
      throw boom.notFound( 'Usuario no Encontrado');
    }
    return usuario;
  }

  async update( id, changes ) {
    const usuario = await this.findOne( id );
    const rta = await usuario.update( changes );
    return rta;
  }

  async delete( id ) {
    const usuario = await this.findOne( id );
    await usuario.destroy();
    return { id };
  }
}

module.exports = UserService;
