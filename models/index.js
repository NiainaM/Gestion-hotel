const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Personne = require('./personneModel')(sequelize, DataTypes);
db.Admin = require('./adminModel')(sequelize, DataTypes);
db.Client = require('./clientModel')(sequelize, DataTypes);
db.Hotel = require('./hotelModel')(sequelize, DataTypes);
db.Chambre = require('./chambreModel')(sequelize, DataTypes);
db.Reservation = require('./reservationModel')(sequelize, DataTypes);

db.Hotel.hasMany(db.Chambre);
db.Chambre.belongsTo(db.Hotel);
db.Chambre.hasMany(db.Reservation);
db.Reservation.belongsTo(db.Chambre);
db.Client.hasMany(db.Reservation);
db.Reservation.belongsTo(db.Client);

// Héritage
db.Personne.hasOne(db.Client, { foreignKey: 'personneId' });
db.Client.belongsTo(db.Personne, { foreignKey: 'personneId' });
db.Personne.hasOne(db.Admin, { foreignKey: 'personneId' });
db.Admin.belongsTo(db.Personne, { foreignKey: 'personneId' });

module.exports = db;