let express = require("express")
let bodyParser = require("body-parser") //manage info received en formato JSON
let userRouter = require("./routes/user.router.js")
let creditsRouter = require("./routes/credits.router.js")
let cookieParser = require('cookie-parser')
let cookieSession = require('cookie-session')

let app = express() //crear config de express para app


//Receive info in JSON format
app.use(bodyParser.json())

//Activate use of cookies
app.use(cookieParser())

//Activate use of session
app.use(cookieSession({
    secret: "aleatorio"
}))

//Config main rout to server
app.get("/", (req,res)=>{
    res.send("respuesta desde /")
})

//Config routes for user management
app.use("/users", userRouter) //GET is declared in router
app.use("/users/create", userRouter) //POST is declared in router
app.use("/users/delete", userRouter) //DELETE is declared in router
app.use("/users/update", userRouter) //UPDATE is declared in router

//Config routes for credits management
app.use("/credits", creditsRouter) //GET is declared in router
app.use("/credits/create", creditsRouter) //POST is declared in router
app.use("/credits/delete", creditsRouter) //DELETE is declared in router
app.use("/credits/update", creditsRouter) //UPDATE is declared in router


module.exports = app