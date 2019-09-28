//This file defines the model or Schema(Mongo) for the DB entry
let mongoose = require("mongoose")

let Schema = mongoose.Schema //Schema is a DB 

let creditSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
        // collection: User
    },
    solicitud: {
        type: Boolean,
        required: true
    },
    fecha_solicitud: {
        type: Date,
        default: Date.now
    },
    aprobado: {
        type: Boolean,
        required: true,
        default: false
    },
    fecha_aprobado: {
        type: Date,
    },
    valor: {
        type: Number,
        required: true
    },
    plazo: {
        type: Number,
        required: true
    },
    interes: {
        type: Number,
        default: 0.02
    },
})

module.exports =  mongoose.model('Credit', creditSchema)