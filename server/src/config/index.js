module.exports = {
    port: process.env.PORT || 8081,
    db: {
        addr: process.env.MONGO_DB_ADDR || 'localhost',
        port: process.env.MONGO_DB_PORT || 27017,
        dbName: process.env.MONGO_DB_NAME || 'ConnectionTest'
    }
}
