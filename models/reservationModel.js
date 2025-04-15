module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reservation', {
      dateDebut: DataTypes.DATE,
      dateFin: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('EN_ATTENTE', 'VALIDEE', 'ANNULEE'),
        defaultValue: 'EN_ATTENTE'
      }
    });
};