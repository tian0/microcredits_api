let mongoose = require("mongoose")
// const CONFIG = require("../config/config") //would need to use CONFIG.DB_CONNECTION to access the module exports object
const { DB_CONNECTION } = require("../config/config")
let connectionString = "mongodb://app:1234@localhost:27017/microcredits_db" //mongodb://user:pwd@localhost...


//module for database connection
module.exports = {
    //variable to indicate connection status
    connection: false,

    //function to open connection
    connect: () => {
        //if connection is active, return the connection
        if (this.connection)
            return this.connection

        mongoose.connect(DB_CONNECTION) //opens connection to DB, was mongoose.connect(CONFIG.DB_CONNECTION), see line 2
            .then((connection) => {
                console.log("CONNECTION TO DB");
            })
            .catch((error) => {
                console.log("ERROR", error);
            })
    },
    disconnect: () => {
        mongoose.connection.close()
            .then(() => {                   //no parameter returned with close, so then is empty
                console.log("DISCONNECTED");
            })
            .catch((error) => {
                console.log("ERROR DISCONNECTING", error);
            })
    }
}
