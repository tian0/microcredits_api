let express = require("express")
let creditsCtr = require("../controllers/credits.controller")

let creditsRouter = express.Router()

creditsRouter
    .get('/', creditsCtr.getAllCredits)

    .get('/test', (req, res) => {
        res.send('Respuesta desde creditsRouter para test function')
    })

    .post('/create', creditsCtr.find, creditsCtr.createCredit) //executes find middleware first to validate credits can be created, next is createCredit

    .delete('/delete/:_id', creditsCtr.deleteCredit) // /:id becomes /1 in url for id:1

    .put('/update/:_id', creditsCtr.updateCredit)
    
// .get('/all', (req, res) => {
//     res.send('Respuesta desde creditsrouter para test function')
// })

module.exports = creditsRouter