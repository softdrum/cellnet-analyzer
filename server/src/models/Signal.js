module.exports = (sequelize, DataTypes) => {

  const Signal = sequelize.define('Signal', {
    signal_level: {type: DataTypes.INTEGER},
    ber: {type: DataTypes.INTEGER},
    operator: {type: DataTypes.STRING},
    generation: {type: DataTypes.INTEGER}
  })

  return Signal
}
