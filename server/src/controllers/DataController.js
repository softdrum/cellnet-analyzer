const {Signal} = require('../models')

module.exports = {
  async getSignalLevelData (req, res) {
    try {
      const data = await Signal.findAll()
      res.send({
        data
      })
    } catch (error) {
      res.status(400).send({
        error: 'Can not get data'
      })
    }
  },
}
