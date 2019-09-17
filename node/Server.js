const http = require('http');
const express = require('express');
const cors=require('cors');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var port = 4500;
var hostName = "localhost";
var fs = require('fs');
const jwt = require('jsonwebtoken');

const server = http.createServer(app);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// for view Table Data*************************************

app.get('/getAllDetails', function (request, response, next) {
  console.log("in  get js");
  fs.createReadStream('studentData.json').pipe(response);
})


// for store empDetails in empDB.json**********************
app.post('/send', (request, response) => {
  console.log(request.body);
  fs.readFile('./empDB.json', function (err, data) {
    var ArrayObject = JSON.parse(data);
    ArrayObject.push(request.body);
    console.log(ArrayObject);
    var empDetails = JSON.stringify(ArrayObject)
    if (fs.existsSync('./empDB.json')) {
      fs.writeFile('./empDB.json', empDetails, 'utf8', (err) => {
        if (err) {
          response.status(201).send({msg:"Failed by writing"});
        } else {
          response.status(200).send({msg:"success"});
        }
      })
    } else {
      response.status(201).send({msg:"Failed by file doesn't exsist"});
    }
  });
  // response.status(200).send({msg:"success"});
});

//add Student Details**************************************
app.post('/addStuDetails', (request, response) => {
  console.log(request.body);
  fs.readFile('./studentData.json', function (err, data) {
    var ArrayObject = JSON.parse(data);
    ArrayObject.push(request.body);
    console.log(ArrayObject);
    var empDetails = JSON.stringify(ArrayObject)
    if (fs.existsSync('./studentData.json')) {
      fs.writeFile('./studentData.json', empDetails, 'utf8', (err) => {
        if (err) {
          response.status(201).send({msg:"Failed by writing"});
        } else {
          response.status(200).send({msg:"success"});
        }
      })
    } else {
      response.status(201).send({msg:"Failed by file doesn't exsist"});
    }
  });
  // response.status(200).send({msg:"success"});
});


//*********************************************************
//Login
const JWT_Secret = 'your_secret_key'; 
app.post('/login', (req, res) => {
  var testUser = { userName: 'tamil', password: '123'};
  if (req.body) {
    var user = req.body;
    console.log(user)
    if (testUser.userName===req.body.userName && testUser.password === req.body.password) {
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token,
        msg:"success"
      });
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }
 
});
//*********************************************************

server.listen(port, hostName, () => {
  console.log("Page is hosted in " + port + ' in ' + hostName);
});