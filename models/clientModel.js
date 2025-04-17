module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Client', {
      numeroClient: DataTypes.STRING,
    });
};