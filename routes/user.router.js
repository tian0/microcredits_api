let express = require("express")
let userCtr = require("../controllers/user.controller")

let userRouter = express.Router()

userRouter
    .get('/', userCtr.getAllUsers)

    .post('/login', userCtr.login)

    .get('/test', (req, res) => {
        res.send('Respuesta desde userrouter para test function')
    })

    .post('/create', userCtr.find, userCtr.generateHash, userCtr.createUsers) //executes find middleware first to validate user can be created, next is createUsers

    .delete('/delete/:_id', userCtr.deleteUsers) // /:id becomes /1 in url for id:1

    .put('/update/:_id', userCtr.updateUsers)
    
// .get('/all', (req, res) => {
//     res.send('Respuesta desde userrouter para test function')
// })

module.exports = userRouter