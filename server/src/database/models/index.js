const fs = require('fs')
const path = require('path')

/**
 * imports all mongo db models
 */

let models = {}
fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))
        models[model.modelName] = model
})

module.exports = models
