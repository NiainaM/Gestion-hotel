module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hotel', {
      name: DataTypes.STRING,
      location: DataTypes.STRING
    });
};