const bcrypt = require ('bcrypt');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Personne', {
      nom: DataTypes.STRING,
      prenoms: DataTypes.STRING,
      email: DataTypes.STRING,
      tel: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      hooks: {
        beforeCreate: async (personne) => {
          if (personne.password) {
            const salt = await bcrypt.genSalt(10);
            personne.password = await bcrypt.hash(personne.password, salt);
          }
        },
        beforeUpdate: async (personne) => {
          const salt = await bcrypt.genSalt(10);
          personne.password = await bcrypt.hash(personne.password, salt);
        }
      }
    });
};