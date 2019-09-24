let express = require("express")
let bodyParser = require("body-parser") //manage info received en formato JSON
let userRouter = require("./routes/user.router.js")

let app = express() //crear config de express para app

//Receive info in JSON format
app.use(bodyParser.json())

//Config main rout to server
app.get("/", (req,res)=>{
    res.send("respuesta desde /")
})

//Config routes for user management
app.use("/users", userRouter) //GET is declared in router
app.use("/users/create", userRouter) //POST is declared in router
app.use("/users/delete", userRouter) //DELETE is declared in router
app.use("/users/update", userRouter) //UPDATE is declared in router



module.exports = app