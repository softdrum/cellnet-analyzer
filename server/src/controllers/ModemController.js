const {Signal} = require('../models')

module.exports = {
  async getData (req, res) {
    try {
      const generation = 4
      const operator = 'MTS'
      const ber = Math.floor((Math.random(100)* 100))
      const s_lvl = Math.floor((Math.random(100)* 100))
      const data = {
        signal_level: s_lvl,
        ber: ber,
        operator: operator,
        generation : generation
      }
      const db_data = await Signal.create(data)
      console.log(`DB_data: ${db_data.toJSON().signal_level}`);
      res.send(data)
    } catch (error) {
      console.log(`Error ${error}`);
      res.status(400).send({
          error: 'Can not get data'
      })
    }
  }
}
