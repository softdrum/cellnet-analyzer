const serialPortGSM = require('serialport-gsm')
const options = {
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  autoDeleteOnReceive: true,
  enableConcatenation: true,
  incomingCallIndication: true,
  incomingSMSIndication: true,
  pin: '',
  customInitCommand: '',
  // logger: console
}
function calculateSignalLevel(value) {
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
}
function mapValue( x,  in_min=2,  in_max=30,  out_min=-119,  out_max=-53){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function calculateBitErrorRate(value) {
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
}
class Modem{
  constructor(port, baudRate) {
    this.port = port
    this.baudRate = baudRate
    this.modem = serialPortGSM.Modem()
    this.logger = null
  }
  openModemConnection() {
    this.modem.open(this.port, {
      baudRate: this.baudRate,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      rtscts: false,
      xon: false,
      xoff: false,
      xany: false,
      autoDeleteOnReceive: true,
      enableConcatenation: true,
      incomingCallIndication: true,
      incomingSMSIndication: true,
      pin: '',
      customInitCommand: '',
      logger: this.logger
    })
  }
  executeAtCommand (command, modem) {
    return modem.executeCommand(command, priority='adasd')
    return new Promise(function(resolve, reject) {
      modem.executeCommand(command, (result, err) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      });
    })
  }
  getSignalQuality () {
    return this.executeAtCommand('AT+CSQ', this.modem)
      .then( (result) => {
        if (result.status === 'ERROR') return 'ERROR'
        let data = result.data.result.match(/(?<s_lvl>\d+)\,(?<ber>\d+)/)
        if (!data) return 'ERROR'
        return {
          topic: 'signal_quality',
          data: {
            s_lvl: calculateSignalLevel(data.groups.s_lvl),
            ber: calculateBitErrorRate(data.groups.ber)
          }
      }
    })
    .catch(error => {return error})
  }
  getAvailableOperators () {
    return this.executeAtCommand('AT+COPS=?', this.modem).then( (result) => {
      if (result.status === 'ERROR') return 'ERROR'
      let data = result.data.result.matchAll(/"(?<operator>\w+)","(?<code>\d+)"/g)
      if (!data) return 'ERROR'
      const operators = [...data].map(res => { return res.groups })
      const unique_operators = Array.from(new Set(operators.map(operator => operator.code)))
        .map(code => {
          return operators.find(operator => operator.code === code)
        })
      return {
        topic: 'available_operators',
        data:  unique_operators
      }
    })
  }
}

module.exports = Modem
