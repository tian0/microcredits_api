let CONFIG = require("./config/config.js")
const app = require('./app.js')

app.listen(CONFIG.PORT, ()=>{
    console.log("Server initialized on port: " + CONFIG.PORT);
})