module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Client', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    });
};