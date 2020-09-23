const modemRegExp = require('./modemRegexp')

function mapValue( x,  in_min=2,  in_max=30,  out_min=-119,  out_max=-53){
  return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
}
/**
 * Helper function for working with at command responses
 */
module.exports = {
  getSystemMode (str) {
    return str.match(/(?<mode>\w+),/)
  },
  getSystemModeCode (mode) {
    switch (mode.toUpperCase()) {
      case 'GSM': return 13
      case 'WCDMA': return 13
      case 'LTE': return 13
      default: return 13
    }
  },
  extractBasestationInfo (data) {
    const mode = this.getSystemMode(data).groups.mode
    switch (mode) {
      case 'GSM': return data.match(modemRegExp.gsm)
      case 'WCDMA': return data.match(modemRegExp.wcdma)
      case 'LTE': return data.match(modemRegExp.lte)
    }
  },
  calculateSignalLevel (value) {
    switch (value) {
      case 0: return -113
      case 1: return -111
      case 31: return -51
      case 99: return null
      case 100: return -116
      case 101: return -115
      default: {
        if (value >= 102) return mapValue(value, 102, 191, -114, -26)
        return mapValue(value)
      }
    }
  },
  calculateBitErrorRate (value) {
    switch (value) {
      case 0: return 0.009
      case 1: return 0.09
      case 2: return 0.49
      case 3: 0.9
      case 4: 1.9
      case 5: 3.9
      case 6: 7.9
      case 7: 8
      default: return 1
    }
  },
  filterUniqueOperators (operators) {
    return Array.from(new Set(operators.map(operator => operator.code))).map(code => {
      return operators.find(operator => operator.code === code)
    })
  }
}
