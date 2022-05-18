

const express = require("express")
const app = express()

const mongo = require("./connectDB.js")



app.use(express.json());

app.use("/", require("./api.js"))


mongo.connectDb(() => { // change value db 

    app.listen(8080)
})






