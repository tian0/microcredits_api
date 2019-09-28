// let mongoose = require("mongoose") //libreria para interactuar con MongoDB
let Credit = require("../models/credits.model") //permite interaccion fon info de DB
let DB = require("../config/database") //database requires mongoose so line 1 is not needed

//Get all Credits
const getAllCredits = async (req, res) => {
    //Call DB to get all Credits
    // res.send("GET all Credits")

    // console.log("getAllCredits()", DB.connection);
    DB.connect()

    await Credit.find().populate('usuario').exec()
        .then((response) => {
            console.log(response);
            res.status(201).send({ "Credits": response, "status": 201 })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ "error": error.message, "status": 500 })
        })

    DB.disconnect()
}

//middleware find
const find = (req, res, next) => {
    DB.connect()
    //Busca si existe credito
    Credit.findById(req.body._id)
        .then((response) => {
            console.log("credit exists?", response);

            //if response is null, credit already exists
            if (response !== null) {
                console.log("throwing at find, credit exists");
                return res.status(500).send({ "error": "Credit already exists" })
            }
            else {
                console.log("going to next()");
                next() //next function is createCredit
            }
        })
        .catch((error) => {
            console.log("error", error.message);
        })
}

//Post Credit
const createCredit = async (req, res) => {
    //DB is open from middleware find
    console.log("createCredit", req.body);

    let newCredit = new Credit(req.body)
    await newCredit.save()
        .then((response) => {
            console.log("createCredit response", response);
            res.status(201).send({ "mensaje": "correcto", "status": 201 })
        })
        .catch((error) => {
            console.log("error", error.message);
            res.status(404).send({ "error": error.message, "status": 404 })
        })
    DB.disconnect()
}

const deleteCredit = async (req, res) => {
    DB.connect()
    // res.send("DELETE credits")
    await Credit.findById(req.params._id) //use params when _id is sent via url/route/:_id
        .then(async (creditFound) => {
            //Delete credit
            await creditFound.remove()
                .then((creditDeleted) => {
                    console.log("response", creditDeleted);
                    res.status(200).send({ "message": "Credit deleted" })
                })
                .catch((error) => {
                    console.log({ "error": error.message });
                    res.status(500).send({ "error": "Credit NOT deleted" })
                })
        })
        .catch((error) => {
            res.send("Credit not found!")
        })
    DB.disconnect()
}

const updateCredit = async (req, res) => {
    DB.connect()

    await Credit.findById(req.params._id)
        .then(async (creditFound) => {
            console.log("Credit found!");
            let creditToSave = await Object.assign(creditFound, req.body)
            await creditToSave.save()
                .then(() => {
                    res.send("updated credit")
                })
                .catch(() => {
                    res.send(error)
                })
        })
        .catch((error) => {
            res.send("Credit NOT found")
        })
    DB.disconnect()
}

module.exports = {
    getAllCredits,
    createCredit,
    deleteCredit,
    updateCredit,
    find
}