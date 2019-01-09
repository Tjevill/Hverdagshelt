// @flow
/* eslint eqeqeq: "off" */
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.json()); // for å tolke JSON

app.use(function(req, res, next) {
  
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://kalvskinnet-api.herokuapp.com"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "mathibra",
  database: "mathibra",
  password: "QcxPTxcA",
  debug: false
});

// Dao's
const Hverdagsdao = require("../dao/hverdagsdao.js");
const eventdao = require("../dao/eventdao.js");
const Casedao = require("../dao/casesdao.js");
const Userdao = require("../dao/userdao.js");




// Authentication with bedrehverdagshelt@gmail.com
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bedrehverdagshelt@gmail.com',
    pass: 'JegErDinHelt69'
  }
});

let userdao = new Userdao(pool);
let eventDao = new eventdao(pool);
let hverdagsdao = new Hverdagsdao(pool);
let caseDao = new Casedao(pool);


app.get("/cases", (req, res) => {
	console.log("/cases fikk request.");
	hverdagsdao.getAllCases((status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Gets all users from DB
 */
app.get('/user', (req: Request, res: Response) => {
	userdao.getAll((status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Get one user from DB by id
 */
app.get('/user/:id', (req: Request, res: Response) => {
	userdao.getOneByID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
    
	})
});

/**
 * Updates user by id
 */
app.put('/user/:id', (req: Request, res: Response) => {
	userdao.updateUser(req.body, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Deletes user by id
 */
app.delete('/user/:id', (req: Request, res: Response) => {
	userdao.deleteUserByID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Gets count of all users in DB
 */
app.get('/userCount', (req: Request, res: Response) => {
	userdao.getCountUsers((status, data) => {
		res.status(status);
		res.json(data);
	})
});




// Events
app.get("/events", (req, res) => {
  console.log("Received get-request on endpoint /events");
  eventDao.getAllEvents((status, data)=>{
    res.status(status);
    res.json(data);
  });
});

app.get("/getEvent/:id", (req, res) =>{
  console.log("Received get-request on endpoint /getone"+req.params.id);
  eventDao.getOne(req.params.id, (status, data)=>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventSearch/:keyword", (req, res) =>{
  console.log("Received get-request on endpoint /eventSearch/"+req.params.keyword);
  eventDao.searchEvent(req.params.keyword, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventOnDateAsc/:date", (req, res) =>{
  console.log("Received get-request on endpoint /eventOnDateAsc/"+req.params.date);
  eventDao.onDateAsc(req.params.date, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

app.get("/eventOnDateDesc/:date", (req, res) =>{
  console.log("Received get-request on endpoint /eventOnDateDesc/"+req.params.date);
  eventDao.onDateAsc(req.params.date, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

// End Events

// Cases

app.get("/allCases", (req, res) =>{
  console.log("Received get-request on endpoint /allCases");
  casedao.getAll((status, data) =>{
    res.status(status);
    res.json(data);
  });
});

/**
 * create case and send case received message 
 *
 */

app.post("/cases", (req, res) => {
  console.log("/cases fikk POST request");
  console.log(req.body.description);

  if(!req.body) {
    return res.sendStatus(400);
  } else {
      caseDao.create({
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        status_id: req.body.status_id,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        zipcode: req.body.zipcode,
        headline: req.body.headline,
        picture: req.body.picture,
        employee_id: req.body.employee_id,
        org_id: req.body.org_id
      },
      (status, data) => {
        res.status(status); 
        res.json(data);
  });
}
  
  let sub = req.body.headline;
  let des = req.body.description;
  
    // mail
  const mailOptionsCase = {
    from: 'bedrehverdagshelt@gmail.com',
    to: 'benos@stud.ntnu.no',
    subject: 'Takk for din henvendelse, saken er registert!',
    html: '<h1>'+ sub + '</h1><p> ' + des + '</p>'
  };

  transporter.sendMail(mailOptionsCase, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
});
 



const server = app.listen(process.env.PORT || "8080", function() {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit");
});
