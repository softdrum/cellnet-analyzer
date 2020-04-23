const {Signal} = require('../models')
const {BS} = require('../models')

function tablePicker(tableName) {
  switch (tableName) {
    case 'signal': return Signal
    case 'bs': return BS
    default: return Signal
  }
}
module.exports = {
  async getData(req, res) {
    try {
      const table = tablePicker(req.body.tableName)
      const data = await table.findAll()
      res.send({
          data: data,
      })
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error: 'This email already in use'
        })
    }
  },
  async addData(req, res) {
    try {
      const table = tablePicker(req.body.tableName)
      await table.bulkCreate(req.body.data)
      res.send({
          success: "true",
      })
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error: 'This email already in use'
        })
    }
  },
  async removeData(req, res) {
    try {
      const tableName = req.body.tableName
      const selected = req.body.selected
      if (tableName) {
        await selected.forEach(element => {
          Signal.destroy({
            where: {
              id: element.id
            }
          })
        });
        res.send({
          success: selected
        })
      }
    } catch (error) {
      console.log('An error occured during removing data');
      console.log(error);
      res.status(400).send({
        success: false,
        error: "An error occured during removing data"
      })
    }
  },
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
