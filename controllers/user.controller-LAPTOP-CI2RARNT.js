let mongoose = require("mongoose") //libreria para interactuar con MongoDB
let User = require("../models/user.model") //permite interaccion fon info de DB

let connectionString = "mongodb://app:1234@localhost:27017/microcredits_db" //mongodb://user:pwd@localhost...
mongoose.connect(connectionString)



//export const getAllUsers = (req, res) => {
const getAllUsers = (req, res) => {
    //Call DB to get all users

    res.send("GET all users")
}

//Create middleware
const find = (req,request) => {
    
}

const createUsers = (req, res) => {
    // console.log("create", req.body);
    //Buscar si existe ya el usuario

    // modelo User() que se conecta con Mongo via mongoose such that, db.user.findOne() = newUser.findOne()
    User.findOne({ cedula: req.body.cedula }) //
        .then((response) => {
            console.log("user exists?", response); //No se puede crear mismo usuario, ya existe

            //If response is null, the user already exists
            if (response !== null) {
                res.status(500).send({ "error": "User already exists", "status": 500 }) //printing json format
                // res.status(500).send(`<h1>User already exists</h1>`) //printing json format
            }
            //else not needed explicitly
            let newUser = new User(req.body)
            newUser.save()
                .then((response) => {
                    console.log("response", response);
                    res.status(201).send({ "mensaje": "correcto", "status": 201 }) //printing json format
                    // res.status(201).send(`<h1>Mensaje Correcto</h1>`)

                })
                .catch((error) => {
                    console.log("error", error.message);
                    // res.status(404).send({ "error": error.message , "status": 404}) //printing json format
                    res.status(404).send(`<h1>Error: ` + error.message + `</h1>`)

                })
        })
        .catch((error) => {
            console.log("error", error);

        })


    // //Call DB to get all users
    // console.log("create", req.body);
    // let newUser = new User(req.body)

    // newUser.save()
    //     .then((response) => {
    //         console.log("response", response);
    //         res.status(201).send({ "mensaje": "correcto", "status": 201}) //printing json format
    //         // res.status(201).send(`<h1>Mensaje Correcto</h1>`)

    //     })
    //     .catch((error) => {
    //         console.log("error", error.message);
    //         // res.status(404).send({ "error": error.message , "status": 404}) //printing json format
    //         res.status(404).send(`<h1>Error: ` + error.message + `</h1>`)

    //     })

    // // newUser.save(function (err) {
    // //     if (err) return console.error(err);
    // // })

    // // res.send("CREATE users")
    // // res.send({ "mensaje": "correcto" })
}
const deleteUsers = (req, res) => {
    //Call DB to get all users

    res.send("DELETE users")
}
const updateUsers = (req, res) => {
    //Call DB to get all users

    res.send("UPDATE users")
}

module.exports = {
    getAllUsers,
    createUsers,
    deleteUsers,
    updateUsers
}