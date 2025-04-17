module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Personne', {
      nom: DataTypes.STRING,
      prenoms: DataTypes.STRING,
      email: DataTypes.STRING,
      tel: DataTypes.STRING,
      password: DataTypes.STRING
    });
};