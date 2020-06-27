const gsm = /(?<mode>\w+),(?<status>\w+),(?<mcc>\d+)-(?<mnc>\d+),(?<lac>.+),(?<cellid>\d+),(?<arfcn>.+),(?<rxlev>[-\d]\d+),(?<tloa>\d+),(?<c1>\d+)-(?<c2>\d+)/,
      wcdma = /(?<mode>\w+),(?<status>\w+),(?<mcc>\d+)-(?<mnc>\d+),(?<lac>.+),(?<cellid>\d+),(?<band>.+),(?<psc>\d+),(?<freq>\d+),(?<ssc>\d+),(?<snr>.+),(?<rscp>\d+),(?<qual>\d+),(?<rxlvl>\d+),(?<txpwr>\d+)/,
      tdswcdma = /(?<mode>\w+),(?<status>\w+),(?<mcc>\d+)-(?<mnc>\d+),(?<lac>.+),(?<cellid>\d+),(?<band>.+),(?<uarfcn>.+),(?<cpid>\d+)/,
      lte = /(?<mode>\w+),(?<status>\w+),(?<mcc>\d+)-(?<mnc>\d+),(?<tac>.+),(?<scellid>\d+),(?<pcellid>\d+),(?<band>.+),(?<earfcn>.+),(?<dlbw>\d+),(?<ulbw>\d+),(?<rsrq>.+),(?<rsrp>.+),(?<rssi>.+),(?<rssnr>.+)/,
      availableOperators = /"(?<operator>\w+)","(?<code>\d+)"/g,
      signalQuality = /(?<s_lvl>\d+)\,(?<ber>\d+)/
module.exports = {
  gsm,
  wcdma,
  tdswcdma,
  lte,
  availableOperators,
  signalQuality
}
