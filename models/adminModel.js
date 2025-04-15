module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });
};