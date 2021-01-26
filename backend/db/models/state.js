'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  State.associate = function(models) {
    State.hasMany(models.Cart, { foreignKey: 'stateId' })
  };
  return State;
};
