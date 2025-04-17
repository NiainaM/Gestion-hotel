module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
      matricule: DataTypes.STRING
    });
};