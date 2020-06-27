module.exports = {
  generate (baudRate, logger) {
    return {
        baudRate: baudRate,
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
        logger: logger
      }
  }
}
