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
    "http://hverdagshelt.herokuapp.com"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



let privateKey = ("asecretprivatekeytorulethemallforgedinthemountainsoffordbord");


'use strict';
var crypto = require('crypto');

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};



const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql.stud.iie.ntnu.no",
  user: "oyvinval",
  database: "oyvinval",
  password: "Dd8noqdd",
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
 * Gets all districts from DB
 */
app.get('/getdistricts', (req: Request, res: Response) => {
    userdao.getAllDistricts((status, data) => {
        res.status(status);
        res.json(data);
    })
});


/**
 * Gets all provinces from specific district from DB
 */
app.get('/getdistricts/:id', (req: Request, res: Response) => {
    userdao.getProvincesFromFylke(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
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

/** Get all events */
app.get("/events", (req, res) => {
  console.log("Received get-request on endpoint /events");
  eventDao.getAllEvents((status, data)=>{
    res.status(status);
    res.json(data);
  });
});

/** Get one event on event_id */
app.get("/getEvent/:id", (req, res) =>{
  console.log("Received get-request on endpoint /getEvent/"+req.params.id);
  eventDao.getOne(req.params.id, (status, data)=>{
    res.status(status);
    res.json(data);
  });
});

/** Search for event on description */
app.get("/eventSearch/:keyword", (req, res) =>{
  console.log("Received get-request on endpoint /eventSearch/"+req.params.keyword);
  eventDao.searchEvent(req.params.keyword, (status, data) =>{
    res.status(status);
    res.json(data);
  });
});

/** Search for event on date ascending */
app.get("/eventOnDateAsc/:date", (req, res) => {
    console.log("Received get-request on endpoint /eventOnDateAsc/" + req.params.date);
    eventDao.onDateAsc(req.params.date, (status, data) => {
        console.log("/cases fikk request.");
        hverdagsDao.getAllCases((status, data) => {
            res.status(status);
            res.json(data);
        });
    });
});

    app.put("/newuser", (req, res) => {
        console.log("Fikk POST-request fra klienten");
        userdao.addUser(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });


    app.get("/user/:username", (req, res) => {
        console.log("/user fikk request: " + req.params.username);
        userdao.getUsername(req.params.username, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    /**  */
    app.get("/eventOnDateDesc/:date", (req, res) => {
        console.log("Received get-request on endpoint /eventOnDateDesc/" + req.params.date);
        eventDao.onDateAsc(req.params.date, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post("/createEvent", (req, res) => {
        console.log("Received post-request from client on endpoint /createEvent");
        eventDao.createEvent(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.delete("/deleteEvent/:event_id", (req, res) => {
        console.log("Received delete-request from client.");
        console.log("Trying to delete event with id: " + req.params.event_id);
        eventDao.deleteEvent(req.params.event_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.put("/updateEvent/:event_id", (req, res) => {
        console.log("received post-request from client");
        console.log("Trying to update event with id: " + req.params.event_id);
        eventDao.updateEvent(req.params.event_id, req.body, (status, data) => {
            res.status(status);
            res.json(data);
            console.log(req.body);
        });
    });

// End Events

// Cases

    /** get all cases */
    app.get("/allCases", (req, res) => {
        console.log("Received get-request on endpoint /allCases");
        caseDao.getAllCases((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    /** count all cases in db */
    app.get("/countCases", (req, res) =>{
        console.log("Received get-request on endpoint /countCases");
        caseDao.getNumberOfCases( (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    /** get case by id */
    app.get("/getCase/:id", (req, res) => {
        console.log("Received get-request on endpoint /getCase/" + req.params.id);
        caseDao.getOne(req.params.id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    /** Get case on user id */
    app.get("/getCaseUserId/:user_id", (req, res) =>{
        console.log("Received get-request on endpoint /getCaseUserId/"+req.params.user_id);
        caseDao.getCaseOnUser(req.params.user_id, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    })

    /** get case on zip */
    app.get("/getOnZip/:zipcode", (req, res) => {
        console.log("Received get-request on endpoint /getOnZip/" + req.params.zipcode);
        caseDao.getOneZip(req.params.zipcode, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    /** get case on category_id */
    app.get("/getOnCategory/:category_id", (req, res) => {
        console.log("Received get-request on endpoint /getOnCategory/" + req.params.category_id);
        caseDao.getOneCategory(req.params.category_id, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    /** update case on case_id */
    app.put("/updateCase/:case_id", (req, res) =>{
      console.log("Received delete-request from client.");
      console.log("Trying to update case with id: "+req.params.case_id);
      caseDao.updateCase(req.params.case_id, req.body, (status, data) =>{
        res.status(status);
        res.json(data);
        console.log(req.body);
      });
    });

    /** search case by category */
    app.get("/searchCaseCategory/:category_id", (req, res) =>{
        console.log("Received get-request from client.");
        caseDao.searchCaseCategory(req.params.category_id, (status, data)=>{
            res.status(status);
            res.json(data);
        });
    });

    /** search case by description */
    app.get("/searchCaseDesc/:description",(req, res) =>{
        console.log("Received get-request from client.");
        caseDao.searchCaseDescription(req.params.description, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    /** delete case by case_id */
    app.delete("/deleteCase/:case_id", (req, res) =>{
      console.log("Received delete-request from client.");
      console.log("Trying to delete event with id: "+req.params.case_id);
      caseDao.deleteCase(req.params.case_id, (status, data) =>{
        res.status(status);
        res.json(data);
      });
    });

    /** create case on user side  */
    app.post("/createUserCase", (req, res) => {
        console.log("Received post-request from client on endpoint /createEvent");
        caseDao.createUserCase(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

  //End Case

  //End Case


app.post("/cases", (req, res) => {
  console.log("/cases received POST-request");
  console.log(req.body.description);

  if(!req.body) {
    return res.sendStatus(400);
  } else {
      caseDao.create({
        headline: req.body.headline,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        zipcode: req.body.zipcode,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        picture: req.body.picture,
        email: req.body.email
        
        
      },
      (status, data) => {
        res.status(status); 
        res.json(data);
        console.log("json.data:" + data[0]);
  });
}
  // mail
  let sub = req.body.headline;
  let des = req.body.description;
  let email = req.body.email;
  
    
  const mailOptionsCase = {
    from: 'bedrehverdagshelt@gmail.com',
    to: email,
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

// End Cases



function loginOk(username, password) {

    var promise1 = new Promise(function (resolve, reject) {
        userdao.getUsername(username, (status, data) => {
            console.log("data: " + data);
            const lagretPass = data[0].password;
            const passwordData = sha512(password, data[0].secret);
            // console.log(lagretPass.localeCompare(passwordData.passwordHash));

            if (passwordData.passwordHash == lagretPass) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
    return promise1;
}

app.post("/login", (req, res) => {
// console.log("LoginOK? : " + (loginOk(req.body.username, req.body.password)));
    var promiseObject = loginOk(req.body.username, req.body.password);
    console.log("promiseobject: " + promiseObject);

    promiseObject.then(function (value) {
        if (value) {
            let token = jwt.sign({username: req.body.username}, privateKey, {
                expiresIn: 60
            });
            res.json({jwt: token, reply: "Login successful! Enjoy your stay"});

            console.log("Brukernavn & passord ok, velkommen " + req.body.username);
        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.status(401);
            res.json({reply: "Not authorized. Login or password incorrect."});
        }
    });
});




// REFRESHING TOKEN
app.use("/refreshtoken", (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok, så du får ikke refreshet");
            res.status(401);
            res.json({ error: "No old token detected, no refresh for you!" });
        } else {
            let token = jwt.sign({ brukernavn: req.body.brukernavn }, privateKey, {
                expiresIn: 5
            });
            res.json({ jwt: token });
        }
    });
});

// PASSWORD PROTECTED AREA!! DONT PUT ANYTHING OUTSIDE OF /admin AND
// DONT PUT ANYTHING THAT SHOULD BE PASSWORD PROTECTED


app.use("/admin", (req, res, next) => {
    var token = req.headers["x-access-token"];
    console.log("/admin : req.headers: ", req.headers["x-access-token"]);
    console.log("/admin : req.headers: ", req.headers);
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.brukernavn);
            next();
        }
    });
});

app.post("/admin/legginn", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    artikkelDao.addArtikkel(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/admin/edit/:id", (req, res) => {
    console.log("Fikk PUT-request fra klienten: " + res.params);
    artikkelDao.editArtikkel(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/admin/delete/:id", (req, res) => {
    console.log("/admin/delete/:id fikk request: " + req.params.id);
    artikkelDao.delArtikkel(req.params.id, (status, data) => {
        res.status(status);
        res.json(data[0]);
    });
});



    const server = app.listen(process.env.PORT || "8080", function () {
        console.log("App listening on port %s", server.address().port);
        console.log("Press Ctrl+C to quit");
    });
