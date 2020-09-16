const modemRegExp = require('../modules/modem/modemRegexp')
const modemHelpers = require('../modules/modem/modemHelpers')
/**
 * Modem service that uses instance of Modem class
 * Executes at commands to get data about signal quality,
 * basestation info, etc.
 * @param {*} modem 
 */
const sleep = ms => {return new Promise(resolve => setTimeout(resolve, ms));}
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
              ber: modemHelpers.calculateBitErrorRate(data.groups.ber),
              time: new Date()
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
    async changeMode (mode) {
      let atCommand = `AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`;
      let result = await modem.executeAtCommand(atCommand);
      if (result.data.result === 'ERROR') throw 'Unable to set preffered system mode'
      console.log(result);
      let retries = 5;
      while (retries) {
        retries--;
        let bsInfo = await this.getBasestationInfo()
        console.log(bsInfo.mode === mode);
        if (bsInfo.mode === mode) return mode
        await sleep(1000);
      }
      throw 'Preffered mode was changed but modem is not connected to suitable base station'
    },
    getGeoLocation () {
      return modem.executeAtCommand('AT+CGPSINFO')
    },
    getBasestationInfo () {
      return modem.executeAtCommand('AT+CPSI?')
        .then(response => {
          if (response.status === 'ERROR') throw 'Can not get BS Info'
          if (response.data.result.trim() === 'NO SERVICE,Online') return {
            status: 'Online',
            mode: 'no service'
          }
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
    getModemBusyMode () {
      return modem.getBusyMode()
    },
  }
}
