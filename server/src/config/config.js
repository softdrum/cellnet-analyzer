module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'DATABASE',
        user: process.env.DB_USER || 'drew',
        password: process.env.PASSWORD || 'admin',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './database.sqlite'
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.EXPIRES_IN || 60 * 60 * 24 * 7
    },
    modem: {
      port: process.env.MODEM_PORT || '/dev/ttyUSB2',
      baudRate: process.env.BAUDRATE || 115200,
      debug: process.env.MODEM_DEBUG_MODE || false,
    }
}
