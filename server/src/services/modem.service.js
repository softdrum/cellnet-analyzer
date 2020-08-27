const modemRegExp = require('../modules/modem/modemRegexp')
const modemHelpers = require('../modules/modem/modemHelpers')


module.exports = (modem) => {
  return {
    getSignalQuality () {
      return new Promise((resolve, reject) => {
        modem.executeAtCommand('AT+CSQ')
          .then( (result) => {
            if (result.status === 'ERROR') reject('Error: Can not get signal quality')
            let data = result.data.result.match(modemRegExp.signalQuality)
            if (!data) reject('Error: Can not get signal quality')
            resolve( {
              s_lvl: modemHelpers.calculateSignalLevel(data.groups.s_lvl),
              ber: modemHelpers.calculateBitErrorRate(data.groups.ber)
            })
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    setPrefferedSystemMode(mode) {
      return modem.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
    },
    changeNetMode (mode) {
      return modem.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
      .then (response => {
        if (response.data.result === 'ERROR')  throw 'Unable to set preffered system mode'
        return sleep(5000).then(() => {
          return modem.getBasestationInfo()
        })
      })
      .then (response => {
        modem.modemBusy = false
        if (response.mode === mode || mode === 'auto') return 'SUCCESS'
        else throw 'Preffered mode was changed but modem is not connected to suitable base station'
      })
      .catch (error => {
        modem.modemBusy = false
        throw error
      })
    },
    getGeoLocation () {
      return modem.executeAtCommand('AT+CGPSINFO')
        .then( (result) => {
          if (result.status === 'ERROR') throw 'Error: Can not get signal quality'
          let data = result.data.result.match(modemRegExp.signalQuality)
          if (!data) throw 'Error: Can not get signal quality'
          return {
            s_lvl: modemHelpers.calculateSignalLevel(data.groups.s_lvl),
            ber: modemHelpers.calculateBitErrorRate(data.groups.ber)
          }
        })
    },
    getBasestationInfo () {
      return modem.executeAtCommand('AT+CPSI?')
        .then(response => {
          if (response.status === 'ERROR') throw 'Can not get BS Info'
          if (response.data.result.trim() === 'NO SERVICE,Online') throw 'No service'
          const info = modemHelpers.extractBasestationInfo(response.data.result)
          if (!info) throw `Unknown data: ${response}`
          return info.groups
        })
    },
    getAvailableOperators () {
      return modem.executeAtCommand('AT+COPS=?')
        .then(response => {
          if (response.status === 'ERROR') throw 'Error: Can not get available operators'
          let data = response.data.result.matchAll(modemRegExp.availableOperators)
          if (!data) throw 'Error: Can not get available operators'
          const available_operators = [...data].map(item => { return item.groups })
          const unique_operators = modemHelpers.filterUniqueOperators(available_operators)
          return {
            topic: 'available_operators',
            data:  unique_operators
          }
        })
    },
    setModemBusyMode (value) {
      modem.setBusyMode(value)
    },
  }
}
