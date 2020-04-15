module.exports = (sequelize, DataTypes) => {

  const Signal = sequelize.define('Signal', {
    signal_level: {type: DataTypes.INTEGER},
    generation: {type: DataTypes.INTEGER}
  })

  return Signal
}
