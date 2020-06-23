export default {
  signal: [
    // {
    //   text: 'Latitude',
    //   align: 'start',
    //   sortable: false,
    //   value: 'lat',
    // },
    // {
    //   text: 'Longitude',
    //   sortable: false,
    //   value: 'long',
    // },
    { text: 'Time', value: 'createdAt'},
    { text: 'Operator', value: 'operator'},
    { text: 'Generation', value: 'generation' },
    { text: 'Level, dBm', value: 'signal_level' },
  ],
  bs: [
    {
      text: 'Longitude',
      align: 'start', 
      sortable: false,
      value: 'lon',
    },
    {
      text: 'Latitude',
      sortable: false,
      value: 'lat',
    },
    { text: 'Range', value: 'range' },
    { text: 'Operator', value: 'operator'},
    { text: 'MCC', value: 'mcc'},
    { text: 'Radio', value: 'radio'},
    { text: 'Unit', value: 'unit'},
    { text: 'Unit', value: 'unit'},
    { text: 'RX level, dBm', value: 'rx_level' },
  ]
}
