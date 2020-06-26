module.exports = (sequelize, DataTypes) => {

  const BS = sequelize.define('BS', {
    radio: {type: DataTypes.STRING},
    mcc: {type: DataTypes.INTEGER},
    mnc: {type: DataTypes.INTEGER},
    area: {type: DataTypes.INTEGER},
    cell: {type: DataTypes.INTEGER},
    unit: {type: DataTypes.INTEGER},
    lon: {type: DataTypes.FLOAT},
    lat: {type: DataTypes.FLOAT},
    range: {type: DataTypes.INTEGER},
    samples: {type: DataTypes.INTEGER},
    changeable: {type: DataTypes.INTEGER},
    created: {type: DataTypes.INTEGER},
    updated: {type: DataTypes.INTEGER},
    averageSignal: {type: DataTypes.INTEGER},
  })

  return BS
}

