

const MongoClient = require("mongodb").MongoClient
var db
module.exports = {
    connectDb: (callback) => {
        MongoClient.connect("mongodb+srv://root:12345@cluster0.vit2y.mongodb.net/test?authSource=admin&replicaSet=atlas-11exv1-shard-0&readPreference=primary&ssl=true", function (err, client) {
            if (err) console.log(err)
             db =  client.db("DemoCK")
            console.log("connect database successfully")
            callback()
        })
    },
    getDb: () => {
        return db
    }
}