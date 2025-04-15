const { ROOM_TYPES } = require('./enums');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Chambre', {
    numero: DataTypes.STRING,
    type: DataTypes.ENUM(...ROOM_TYPES),
    status: {
      type: DataTypes.ENUM('LIBRE', 'OCCUPEE'),
      defaultValue: 'LIBRE'
    }
  });
};