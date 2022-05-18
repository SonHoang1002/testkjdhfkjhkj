
// cap nhat nguoi nop thue 2b
//tim kiem thong tin theo sdt 3b
var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = require('chai').assert
var should = chai.should
const port = 'http://localhost:8080'
chai.use(chaiHttp);
const mongo = require("./connectDB.js")

let db 


describe("functions",async function() {
  await before(function () {
    mongo.connectDb(()=>{
      db = mongo.getDb()
    })
  });

  it("get user by phone", (done) => {
    const phone = "837475734827"
    chai.request(port)
      .get("/phone/" + phone)
      .end((err, res) => {
        assert.equal(res.status, 200)
        console.log(res.body);
        assert.equal(res.body.lienhe.dt, phone)
      })
    done()
  })

  it('update user', function (done) {
    const obj = {
      "id": "1",
      "hoten": "hoang van abc",
      "tuoi": 348457698,
      "cc": "3487983",
      "lienhe": {
        "dt": "837475734827",
        "email": "hva@gmail.com",
        "diachi": "quang chau"
      },
      "npt": [
        "997",
        "998",
        "999"
      ]
    }
    chai.request(port)
      .put('/update/1')
      .send(obj)
      .end(function (err, res) {
        assert.equal(res.status, 200)
        console.log(res.body);
        assert.equal(res.body.modifiedCount, 1)
        assert.equal(res.body.acknowledged, true)
        assert.equal(res.body.matchedCount, 1)
    //    console.log("update user by ID on test update successfully");
      });
    done();
  });

  after(function () {
    mongo.connectDb(() => { 
      const oldObject = {
        "id": "1",
        "hoten": "hoang van abc",
        "tuoi": 34,
        "cc": "3487983",
        "lienhe": {
          "dt": "837475734827",
          "email": "hva@gmail.com",
          "diachi": "quang chau"
        },
        "npt": [
          "997",
          "998",
          "999"
        ]
      }
      mongo.getDb().collection("UserCK").replaceOne({ "id": "1" }, oldObject, () => {
          console.log("update user by ID after test update successfully");
      })
    });
  })

})