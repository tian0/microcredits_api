const CONN_STRING = 'mongodb+srv://admin:Admin123@cluster0-jjsmh.mongodb.net/microcredits_db'

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: CONN_STRING //"mongodb://app:1234@localhost:27017/microcredits_db"
}