module.exports = (sequelize, DataTypes) => {

  const BS = sequelize.define('BS', {
    lat: {type: DataTypes.FLOAT},
    long: {type: DataTypes.FLOAT},
    operator: {type: DataTypes.STRING},
    generation: {type: DataTypes.INTEGER},
    radius: {type: DataTypes.INTEGER},
    arfcn: {type: DataTypes.INTEGER},
    rx_level: {type: DataTypes.INTEGER},
  })

  return BS
}
