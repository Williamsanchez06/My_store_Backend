const { Sequelize , DataTypes, Model } = require('sequelize');

const USER_TABLE = 'users'

const UserSchema = {

    id : {
      allowNull: false,
      autoIncrement : true,
      primaryKey: true,
      type : DataTypes.INTEGER
    },
    email : {
      allowNull: false,
      type  : DataTypes.STRING,
      unique : true
    },
    password : {
      allowNull: false,
      type : DataTypes.STRING
    },
    createdAt : {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW
    }

}

class User extends Model {

  static associate( models ){
    this.hasOne( models.Customer, {
      as : 'customer',
      foreignKey : 'userId',
    })
  }

  static config( db ) {
    return {
      sequelize : db,
      tableName : USER_TABLE,
      modelName : 'User',
      TimeRanges : false
    }
  }

}

module.exports = { USER_TABLE, UserSchema, User }
