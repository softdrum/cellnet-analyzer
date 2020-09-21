module.exports = {
  apps : [
    {
      name: 'web-interface',
      script: 'serve',
      cwd: './client',
      env: {
        "PM2_SERVE_PATH": 'dist',
        "PM2_SERVE_SPA": true,
        "PM2_SERVE_PORT": 8080,
        "PM2_SERVE_HOMEPAGE": '/index.html'
      },
      watch: '.'
    },
    {
      name: 'api-service',
      script: 'server.js',
      cwd: './server',
      env: {
        "PORT": 8081,
        "MONGO_DB_ADDR": "localhost",
        "MONGO_DB_PORT": 27017,
        "MONGO_DB_NAME": "ConnectionTest"
      },
      watch: '.'
    },
    {
      name: 'socketIO',
      script: 'server.js',
      cwd: './socket-server',
      env: {
        "PORT": 8082,
        "MODEM_PORT": "/dev/ttyUSB2",
        "MODEM_BAUDRATE": 115200,
        "MODEM_MOCK_MODE": "F"
      },
      watch: '.'
    },
    {
      name: 'vector-tile-server',
      script: 'index.js',
      cwd: '/home/pi/projects/vector-tile-server',
      env: {
        "HOST": "192.168.0.104",
        "PORT": 8083,
      },
      watch: '.'
    }
  ]
};
