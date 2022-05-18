const express = require("express")
const useRouter = express.Router()


const mongo = require("./connectDB.js")

// 2a - add user successfully
useRouter.post('/add', (req, res) => {
    mongo.getDb().collection('UserCK').insertOne(req.body, (err, data) => {
        if (err) {
            console.log("error")
            res.json({ "message ": err.message })
        }
        else {
            console.log("insert successfully")
            res.send("insertedId: " + data.insertedId);
        }
    });
})

// 2b - get All list and get user by ID successfully
useRouter.get('/', (req, res) => {
    mongo.getDb().collection("UserCK").find().toArray((err, data) => {
        if (err)
            res.send(err);
        else
            res.json(data)
        console.log("get all list user successfully");

    })
})

useRouter.get('/find/:id', (req, res) => {
    mongo.getDb().collection("UserCK").findOne({ "id": req.body.id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data)
            console.log("get user by ID successfully");
        }
    })
})

//2c : update user by ID successfully
useRouter.put("/update/:id", (req, res) => {
    mongo.getDb().collection("UserCK").replaceOne({ "id": req.params.id }, req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
            console.log("update user by ID successfully");
        }
    })
})

// 2d: delete user by ID successfully
useRouter.delete("/delete/:id", (req, res) => {
    mongo.getDb().collection("UserCK").deleteOne({ "id": req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
            console.log("delete user by ID successfully");
        }
    })
})


// Cau 3


//3a :insert list user successfully
useRouter.post("/adds", (req, res) => {
    mongo.getDb().collection("UserCK").insertMany(req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
            console.log("insert user list successfully");
        }
    })
})


//3b : find user'information by sdt
useRouter.get('/phone/:sdt', (req, res) => {
    mongo.getDb().collection("UserCK").findOne({ "lienhe.dt": req.params.sdt }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data)
            console.log("get user'sdt by ID successfully");
        }
    })
})

//find npt with id of userCk
useRouter.get('/find/npt/:id', (req, res) => {
    mongo.getDb().collection("UserCK").findOne({ "id": req.params.id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            // res.send(data.npt)
            mongo.getDb().collection("Npt").find({
                nptId: {
                    $in: data.npt
                }
            }).toArray((err1, data1) => {
                if (err1) throw err1
                res.send(data1)
            })
        }
    })
})

// update npt đầu tiên with id of userCK
useRouter.post("/update/npt/:id",(req,res)=>{
    mongo.getDb().collection("UserCK").findOne({"id":req.params.id},(err,data)=>{
        if(err) throw err
        mongo.getDb().collection("Npt").replaceOne({"nptId":{$in:data.npt}}, req.body,(err1,data1)=>{
            if(err1) throw err1
            res.send(data1)
        })

    })
})
useRouter.get("/npt",(req,res)=>{
    mongo.getDb().collection("Npt").find().toArray((err,data)=>{
        if(err) throw err
            res.send(data)
    })
})
// useRouter.put("/update/npt/:id", (req, res) => {
//     mongo.getDb().collection("Npt").replaceOne({ "nptId": req.params.id }, req.body, (err, data) => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send(data)
//             console.log("update user by nptId successfully");
//         }
//     })
// })
module.exports = useRouter








