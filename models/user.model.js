//This file defines the model or Schema(Mongo) for the DB entry
let mongoose = require("mongoose")

let Schema = mongoose.Schema //Schema is a DB 

let userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now
    },
    cedula: Number
})

module.exports = mongoose.model('User', userSchema)