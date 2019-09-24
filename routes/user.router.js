let express = require("express")
let userCtr = require("../controllers/user.controller")

let userRouter = express.Router()

userRouter
    .get('/', userCtr.getAllUsers)

    .get('/test', (req, res) => {
        res.send('Respuesta desde userrouter para test function')
    })

    .post('/create', userCtr.createUsers)

    .delete('/delete', userCtr.deleteUsers)

    .put('/update', userCtr.updateUsers)
    
// .get('/all', (req, res) => {
//     res.send('Respuesta desde userrouter para test function')
// })

module.exports = userRouter