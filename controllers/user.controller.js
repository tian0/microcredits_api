let mongoose = require("mongoose") //libreria para interactuar con MongoDB
let User = require("../models/user.model") //permite interaccion fon info de DB
let DB = require("../config/database")
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')

//Connection to DB is left open with this method, see config/database.js and config.js for proper open-close method
// let connectionString = "mongodb://app:1234@localhost:27017/microcredits_db" //mongodb://user:pwd@localhost...
// mongoose.connect(connectionString) //opens connection to DB



//export const getAllUsers = (req, res) => {
const getAllUsers = async (req, res) => {
    //Call DB to get all users
    // res.send("GET all users")

    console.log("getAllUsers()", DB.connection);
    DB.connect()

    await User.find()
        .then((response) => {
            console.log(response);
            res.status(201).send({ "users": response, "status": 201 })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ "error": error.message, "status": 500 })
        })

    DB.disconnect()
}

//Middleware login
const login = async (req, res, next) => {
    console.log("User", req.body.email)

    // const email = req.body.email;
    // const clave = req.body.clave;
    DB.connect()

    //Validate user login
    await User.findOne({ "email": req.body.email })
        .then(async (response) => { //response is User model, contains clave
            console.log("Token in DB: ", response.clave);

            //Compare DB hashed clave with bcrypt hash of input clave
            await bcrypt.compare(req.body.clave, response.clave)
                .then((status) => {
                    console.log(status);
                    if (status) {
                        jwt.sign({ "id": "12345" }, req.body.clave, (err, token) => {
                            console.log("token: ", token);
                            console.log("****SESSION****", req.session);
                            res.cookie("token", token)
                            res.status(200).send({"token": token})
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((error) => {
            console.log("error: ", error);
        })

    DB.disconnect()
};

//Create Middleware - to find user if it already exists before creating new one
const find = (req, res, next) => {
    DB.connect()
    //Buscar si existe ya el usuario
    // modelo User() que se conecta con Mongo via mongoose such that, db.user.findOne() = newUser.findOne()
    User.findOne({ cedula: req.body.cedula }) //
        .then((response) => {
            // console.log("user exists?", response); //No se puede crear mismo usuario, ya existe
            //If response is null, the user already exists
            if (response !== null) {
                console.log('throwing at find, user exists');
                return res.status(500).send({ "error": "User already exists", "status": 500 }) //printing json format
                // res.status(500).send(`<h1>User already exists</h1>`) //printing json format
            }
            else {
                console.log('going to next() in find');
                next() //next function in user.router is createUser, it executes if find user is null
            }

        })
        .catch((error) => {
            console.log("error", error.message);

            //Close DB connection on middleware error
            DB.disconnect()

        })
}

//Middleware to encrypt password for DB entry of hash only
const generateHash = async (req, res, next) => {
    // console.log("GENERATE HASH: ", clave)
    await bcrypt.hash(req.body.clave, 10).then(function (hash) {
        req.body.clave = hash
        console.log("Contrasena encryptada en DB con hash:", hash)

        next()      //next function is declared in router, in this case createUser
    })
}

const createUsers = async (req, res) => {
    //DB is already open from first middleware find()
    // console.log("createUser", req.body);
    let newUser = new User(req.body)
    await newUser.save()
        .then((response) => {
            // console.log("createUsers response", response);
            res.status(201).send({ "mensaje": "correcto", "status": 201 }) //printing json format
            // res.status(201).send(`<h1>Mensaje Correcto</h1>`)

        })
        .catch((error) => {
            console.log("error", error.message);
            // res.status(404).send({ "error": error.message , "status": 404}) //printing json format
            res.status(404).send(`<h1>Error: ` + error.message + `</h1>`)
        })

    DB.disconnect()
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
const deleteUsers = async (req, res) => { //have async elements within function callback, parent must be async
    DB.connect()
    //Call DB to get all users
    // res.send("DELETE users")
    // let userToDel = new User({"id": req.params.id})

    console.log(req.params);
    await User.findById(req.params._id)
        .then(async (userFound) => {
            //Delete User
            await userFound.remove() //moongoose functions are promises as db is accessed
                //await removal before continuing to response and disconnect DB, if not awaited DB may disconnect before removal promise received
                .then((userDeleted) => {
                    console.log("response", userDeleted);
                    res.status(200).send({ "message": "User deleted" })
                })
                .catch((error) => {
                    console.log({ "error": error.message });
                })
            // res.send({ "user": userFound })
        })
        .catch((error) => {
            res.send("User not found!")
        })
    DB.disconnect()
}
const updateUsers = async (req, res) => {
    DB.connect()
    //Call DB to find user by Id

    //METHOD 1
    // User.update({nombre:"maria"},{nombre:"NOMBRE NUEVO"})
    // .then(()=>{
    //     res.send("updated")
    // })
    // .catch(()=>{
    //     res.send('error')
    // })

    //METHOD 2
    // User.findById(req.params._id)
    //     .then((userFound) => {
    //         // res.send("found")
    //         User.update(userFound, req.body)
    //         .then(()=>{
    //             res.send("Updated")
    //         })
    //         .catch(()=>{
    //             res.send("Not updated")
    //         })
    //     })
    //     .catch((error) => {
    //         res.send("No encontrado!")
    //     })

    //METHOD 3
    // User.findById(req.params._id)
    //     .then((userFound) => {
    //         // res.send("found")
    //         // User.update(userFound, req.body)
    //         userFound.update(req.body)
    //         .then(()=>{
    //             res.send("Updated")
    //         })
    //         .catch(()=>{
    //             res.send("Not updated")
    //         })
    //     })
    //     .catch((error) => {
    //         res.send("No encontrado!")
    //     })

    //METHOD 4
    await User.findById(req.params._id)
        .then(async (userFound) => {
            // console.log("found");
            let userToSave = await Object.assign(userFound, req.body)
            await userToSave.save()
                .then(() => {
                    res.send("updated user")
                })
                .catch(() => {
                    res.send(error)
                })
            // const target = { req.params.param: req.params.new }
            // const source = 
            // Object.assign(req.params.param, )
            //  = req.params.new
            // userFound.save() //moongoose functions are promises as db is accessed
            //     .then((userUpdated) => {
            //         console.log("response", userUpdated);
            //         res.status(200).send({ "message": "User updated" })
            //     })
            //     .catch((error) => {
            //         console.log({ "error": error.message });
            //     })
            // // res.send({ "user": userFound })
        })
        .catch((error) => {
            res.send("User NOT found!")
        })
    DB.disconnect()
    // res.send("UPDATE users")
}
module.exports = {
    getAllUsers,
    createUsers,
    deleteUsers,
    updateUsers,
    find,
    login,
    generateHash
}