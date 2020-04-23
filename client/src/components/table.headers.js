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
      text: 'Latitude',
      align: 'start',
      sortable: false,
      value: 'lat',
    },
    {
      text: 'Longitude',
      sortable: false,
      value: 'long',
    },
    { text: 'Radius', value: 'radius' },
    { text: 'Operator', value: 'operator'},
    { text: 'ARFCN', value: 'arfcn' },
    { text: 'RX level, dBm', value: 'rx' },
    
    { text: 'Actions', value: 'actions', sortable: false },
  ]
}
