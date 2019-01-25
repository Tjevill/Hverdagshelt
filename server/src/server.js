
/* eslint eqeqeq: "off" */

const express = require("express");
const config = require('../../config.js');
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
const crypto = require('crypto');

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

/** Authentication with database */

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    debug: false
});

/** Authentication with bedrehverdagshelt@gmail.com */
const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.password
    }
});

/** Dao- imports */
const Casedao       = require("../dao/casesdao.js");
const Categorydao   = require("../dao/categorydao.js");
const eventdao      = require("../dao/eventdao.js");
const Employeedao   = require("../dao/employeedao.js");
const Empdao        = require("../dao/employeedao.js");
const GeoDao        = require("../dao/geodao.js");
const Orgdao        = require("../dao/orgdao.js");
const Statusdao     = require("../dao/statusdao.js");
const StatDao       = require("../dao/statisticsdao.js");
const Userdao       = require("../dao/userdao.js");

let caseDao     = new Casedao(pool);
let categoryDao = new Categorydao(pool);
let eventDao    = new eventdao(pool);
let employeeDao = new Employeedao(pool);
let empDao      = new Empdao(pool);
let geodao      = new GeoDao(pool);
let orgDao      = new Orgdao(pool);
let statusDao   = new Statusdao(pool);
let statDao     = new StatDao(pool);
let userdao     = new Userdao(pool);



/** @Userdao methods here*/

/**
 * Gets all users from DB
 */
app.get('/user', (req: Request, res: Response) => {
    userdao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/** Create user and send welcome-email */
app.post("/user", (req, res) => {
    console.log("POST-request from client /user");

    userdao.addUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);

        let email = req.body.email;
        const mailOptionsCase = {
            from: 'bedrehverdagshelt@gmail.com',
            to: email,
            subject: 'Velkommen som HverdagsHelt!',
            html:
                '<h1> Velkommen som helt! </h1>' +
                '<p> Logg inn på hverdagshelt for å legge inn saker! :) </p>'

        };

        transporter.sendMail(mailOptionsCase, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); // transporter
    });
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
 * Gets all districts from DB
 */


/** DUPE exact same as user/:id
* Updates user by id by an Employee
*/
 app.put('/useredit/:id', checkIfEmployee, (req: Request, res: Response) => {
    userdao.updateUser(req.body, (status, data) => {
      res.status(status);
      res.json(data);
     })
 });

/**
 * Updates user by id by themselves
 */
app.put('/user/:id', checkIfUser, (req: Request, res: Response) => {
    userdao.updateUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Deletes user by id
 */
app.delete('/user/:id', checkIfEmployee, (req: Request, res: Response) => {
    userdao.deleteUserByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get('/districts', (req: Request, res: Response) => {
    userdao.getAllDistricts((status, data) => {
        res.status(status);
        res.json(data);
    })
});


/**
 * Gets all provinces from specific district from DB
 */
app.get('/districts/:id', (req: Request, res: Response) => {
    userdao.getProvincesFromFylke(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one user from DB by token
 */
app.get('/token/user', (req: Request, res: Response) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            userdao.getOneByID(decoded.userid, (status, data) => {
                res.status(status);
                res.json(data);
                console.log("/getuser/ sending: ", data)
            })
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    });
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

/**
 * Gets email from user by ID
 */
app.get('/user/:id/email', (req: Request, res: Response) => {
    userdao.getEmailUserByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * For updating subscription for one user
 */
app.put('/userSubscriptionUpdate', (req: Request, res: Response) => {
    userdao.updateSubription(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get province from User by users ID
 */
app.get('/userProvince/:id', (req: Request, res: Response) => {
    userdao.getUsersProvinceByUserID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Searches users by their name and returns all users that has equality to the search input
 */
app.get('/userNameSearch/:searchString', (req: Request, res: Response) => {
    userdao.getUserByNameSearch(req.params.searchString, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/user/:username", (req, res) => {
    console.log("/user fikk request: " + req.params.username);
    userdao.getUsername(req.params.username, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

// End User

//
//
//
//
//
//
//
//
//
//
//
//
//


// Organization

app.put("/neworganization", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    orgDao.addOrganization(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


/**
 * Get all organisations from DB
 */
app.get("/org", (req: Request, res: Response) =>{
    orgDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one org by ID
 */
app.get('/org/:id', (req: Request, res: Response) => {
    orgDao.getOneByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one org by token
 */
app.get('/getorg/', (req: Request, res: Response) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            orgDao.getOneByID(decoded.userid, (status, data) =>{
                res.status(status);
                res.json(data);
                console.log("/getorg/ sending: ", data)
            })
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    });
});

/**
 * Adds a new organization or the Organization table
 */

app.put("/neworganization", checkIfEmployee, (req, res) => {
    console.log("Fikk POST-request fra klienten");
    orgDao.addOrganization(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


/**
 * Adds organization- and category ids to the reference table.
 */

app.put("/neworgcat/:id", checkIfEmployee, (req, res) => {
    console.log("Fikk POST-request fra klienten");
    employeeDao.addManyRefrences(req.body, req.params.id, (status, data) => {
        res.status(status);
        //  res.json(data);
    });
});


/**
 * Update org by ID (does not include password update)
 */
app.put('/org/:id', checkIfEmployee, (req: Request, res: Response) => {
    orgDao.updateOrg(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


app.put('/orgedit/:id', checkIfOrganization, (req: Request, res: Response) => {
    orgDao.updateOrg(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Update org password by ID send object including new password and org_id
 */
app.put('/updateOrgPWord', (req: Request, res: Response) => {
    orgDao.updateOrgPassword(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get every case for one organization using the org_id.
 */
app.get("/getAllCasesOrg/:org_id", (req: Request, res: Response) => {
    orgDao.getAllCasesOrg(req.params.org_id, (status, data) =>{
        res.status(status);
        res.json(data);
    })
});

/**
 * Delete one org by ID
 */
app.delete('/org/:id', checkIfEmployee, (req: Request, res: Response) => {
    orgDao.deleteOrgByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Add new organization
 */
app.post("/newOrg", checkIfEmployee, (req, res) => {
    orgDao.addOrg(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**
 * Get count of all organizations from DB
 */
app.get('/orgCount', (req: Request, res: Response) => {
    orgDao.getCountOrg((status, data) => {
        res.status(status);
        res.json(data);
    })
});

// ORG END
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// Category
/**
 * Get all categories from DB
 */
app.get("/category", (req: Request, res: Response) =>{
    categoryDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one category by ID
 */
app.get("/category/:id", (req: Request, res: Response) =>{
    categoryDao.getOneByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get one cat_org by ID
 */
app.get("/categoryorg/:cat/:org", (req: Request, res: Response) =>{
    categoryDao.checkIfCheckedOrgCat(req.params.cat, req.params.org, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Update category
 */
app.put('/category/:id', checkIfEmployee, (req: Request, res: Response) => {
    categoryDao.updateCategory(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Add category
 */
app.post('/addcategory', checkIfEmployee, (req: Request, res: Response) => {
    categoryDao.addCategory(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Deletes one category by ID
 */
app.delete('/category/:id', checkIfEmployee, (req: Request, res: Response) => {
    categoryDao.deleteCategoryByID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Deletes one category by ID
 */
app.delete('/category_org/:id', checkIfEmployee, (req: Request, res: Response) => {
    categoryDao.deleteCategoryByOrgID(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Get count of categories in DB
 */
app.get('/categoryCount', (req: Request, res: Response) => {
    categoryDao.getCountCategories((status, data) => {
        res.status(status);
        res.json(data);
    })
});

/**
 * Gets all categories connected to an organization
 */
app.get('/categoriesOrg/:id', (req: Request, res: Response) => {
	categoryDao.getCategoriesForOrganization(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});


// End category

//
//
//
//
//
//
//
//
//
//
//
//


// Employee

app.put("/newemployee", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    console.log(req.body);
    employeeDao.addEmployee(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/neworgcat/:id", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    employeeDao.addManyRefrences(req.body, req.params.id, (status, data) => {
        res.status(status);
        //  res.json(data);
    });
});

/** Get all employees from the db */
app.get("/employee", (req, res) => {
    console.log("Received get-request on endpoint /employee.");
    empDao.getAllEmp( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get one employee matched on employee_id */
app.get("/employee/:employee_id", (req, res) =>{
    console.log("Received get-request on endpoint /employee/"+req.params.employee_id);
    empDao.getOne(req.params.employee_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/**
 * Get one Employeee from DB by token
 */
app.get('/getemployee/', (req: Request, res: Response) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            empDao.getOne(decoded.userid, (status, data) =>{
                res.status(status);
                res.json(data);
                console.log("/getemployee/ sending: ", data)
            })
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    });
});

/** Get all employees in one province */
app.get("/employee/commune/:commune", (req, res) =>{
    console.log("Received get-request on endpoint /employee/commune/"+req.params.commune);
    empDao.getAllEmpCommune(req.params.commune, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/**  Create an employee in the db*/
app.put("/employee", (req, res) =>{
    console.log("Received put-request on endpoint /employee");
    empDao.addEmployee(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** Delete an employee in the db on employee_id */
app.delete("/employee/:employee_id", checkIfEmployee, (req, res) =>{
    console.log("Received delete-request on endpoint /employee/"+req.employee_id);
    empDao.deleteEmpById(req.params.employee_id, (status, data)=>{
        res.status(status);
        res.json(data);
    });
});

/** Update an employee in db on employee_id. Does NOT include password change. */
app.put("/employee/:employee_id", checkIfEmployee,(req: Request, res: Response) =>{
    console.log("Received put-request on endpoint /employee/"+req.body.employee_id);
    console.log("body & soul "+req.body.email);
    empDao.updateEmp(req.body, req.body.employee_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Update an employee password in the db on employee_id */
app.put("/updateEmpPW", (req: Request, res: Response) =>{
    console.log("Received post-request on endpoint /updateEmpPw");
    empDao.updateEmpPassword(req.body, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Count every employee in the db */
app.get("/countEmp", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /countEmp");
    empDao.countEmps( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/**  Count every employee in a specific province*/
app.get("/countEmp/:province", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /countEmp/"+req.params.province);
    empDao.countEmpsProvince(req.params.province, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

app.get("/getCasesOnCommuneID/:id", (req, res) => {
	empDao.getCasesOnCommuneID(req.params.id, (status, data) => {
		console.log("req paarms: " + req.params.id);
		res.status(status);
		res.json(data);
	});
});

app.get("/CommuneName/:commune", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /CommuneName/"+req.params.commune);
    empDao.getCommuneName(req.params.commune, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

app.get("/getCasesOnCommuneID/:id", (req, res) => {
	empDao.getCasesOnCommuneID(req.params.id, (status, data) => {
		console.log(req.params.id);
		res.status(status);
		res.json(data);
	});
});

/**
 * Verify if email exists. Returns 1 if true, 0 if not
 */

app.get("/searchEmployeeEmail/:email", (req, res) => {
    empDao.searchEmployeeEmail(req.params.email, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/searchOrgEmail/:email", (req, res) => {
    empDao.searchOrgEmail(req.params.email, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/searchUserEmail/:email", (req, res) => {
    empDao.searchUserEmail(req.params.email, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**
 * Gets cases on employees id
 */
app.get("/getCaseOnEmployeeID/:id", (req, res) => {
	employeeDao.getCaseOnEmployeeID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	});
});

// End employee

//
//
//
//
//
//
//
//
//
//
//
//
//
//


// Events

app.get("/events/:commune_id", (req, res) =>{
    console.log("Fikk GET-request from client, hent events i kommune: " + req.params.commune_id);
    eventDao.getEventInCommune(req.params.commune_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});


/**
 * Get events in selected commune ID
 */
app.get("/getEventsOnCommuneID/:id", (req, res) => {
	eventDao.getEventsOnCommuneID(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	});
});

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
        casedao.getAllCases((status, data) => {
            res.status(status);
            res.json(data);
        });
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

app.post("/createEvent", checkIfEmployee, (req, res) => {
    console.log("Received post-request from client on endpoint /createEvent");
    eventDao.createEvent(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/deleteEvent/:event_id", checkIfEmployee, (req, res) => {
    console.log("Received delete-request from client.");
    console.log("Trying to delete event with id: " + req.params.event_id);
    eventDao.deleteEvent(req.params.event_id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/updateEvent/:event_id", checkIfEmployee, (req, res) => {
    console.log("received post-request from client");
    console.log("Trying to update event with id: " + req.params.event_id);
    eventDao.updateEvent(req.params.event_id, req.body, (status, data) => {
        res.status(status);
        res.json(data);
        console.log(req.body);
    });
});

// End Events

//
//
//
//
//
//
//
//
//
//
//
//


// Cases

/** Get all cases */
app.get("/case", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    caseDao.getAllCases((status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**
 * Get the 5 latest cases with status "Registrert" in you commune.
 * :id is commune_id.
 */
app.get("/fiveLatestCommune/:id", (req, res) => {
    console.log("Received get-request on endpoint /fiveLatestCommune/"+req.params.id);
    caseDao.getFiveLatestRegistered(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

/* Will probably be removed, use -> /updatecasebyemployee, /updateCase, /updateCaseandcomment
app.put("/changeCaseStatus/:id", (req, res) => {
    caseDao.updateCaseStatus(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});
*/

app.put("/updateCaseStatusToDeleted/:id", (req, res) => {
	caseDao.updateCaseStatusToDeleted(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});
/** Get every case with status_id = 1. */
app.get("/allCases/status/:status_id", (req, res) =>{
    console.log("Received get-request on endpoint /allCases/status/"+req.params.status_id);
    caseDao.getStatus(req.params.status_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get the province of every case*/
app.get("/allCases/:province", (req, res) =>{
    console.log("Received get-request on endpoint /allCases/"+req.params.province);
    caseDao.getProvinceOnCase( req.params.province, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Count all cases in db */
app.get("/countCases", (req, res) =>{
    console.log("Received get-request on endpoint /countCases");
    caseDao.getNumberOfCases( (status, data) =>{
        res.status(status);
        res.json(data);
    });
});

/** Get case by id */
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


/** get all categories  */

app.get("/getAllCategories", (req, res) => {
    console.log("Received get-request on endpoint /getAllCategories");
    employeeDao.getAllCategories((status, data) => {
        res.status(status);
        res.json(data);
    });
});


/** update case on case_id */

app.put("/updateCase/:case_id", checkIfEmployee, (req, res) =>{
    console.log("Received put-request on /updateCase/:case_id from client.");
    console.log("Trying to update case with id: " + req.params.case_id);

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid);
            console.log("DECODED: ", decoded.email);

            req.body.user_id = decoded.userid;
            caseDao.updateCase(req.body, (status, data) => {
                res.status(status);
                res.json(data);

                let email = decoded.email;
                const mailOptionsCase = {
                    from: 'bedrehverdagshelt@gmail.com',
                    to: email,
                    subject: 'Din sak har blitt oppdaert!',
                    html:
                        '<h1>' + req.body.status_id + ' </h1>' +
                        '<p> Logg inn på hverdagshelt for å se siste oppdatering! :) </p>'

                };

                transporter.sendMail(mailOptionsCase, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                }); // transporter

            }); //updateUserCase

        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        } // else
    });
});



/** search case by category description */
app.get("/searchCaseCategory/:description", (req, res) =>{
    console.log("Received get-request from client.");
    caseDao.searchCaseCategory(req.params.description, (status, data)=>{
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
app.delete("/deleteCase/:case_id", checkIfEmployee, (req, res) =>{
    console.log("Received delete-request from client.");
    console.log("Trying to delete event with id: "+req.params.case_id);
    caseDao.deleteCase(req.params.case_id, (status, data) =>{
        res.status(status);
        res.json(data);
    });
});


/** create case by user  */
app.post("/case", (req, res) => {
    console.log("Received post-request from client on endpoint /case");

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            console.log("DECODED: ", decoded.email);
            req.body.user_id = decoded.userid;
            caseDao.createUserCase(req.body, (status, data) => {
                res.status(status);
                res.json(data);

                let sub = req.body.headline;
                let des = req.body.description;
                let email = decoded.email;

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
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    });
});


/**
 * For organizations to update comment and status of a case they are registered as working on
 */
/*app.put("/updateStatusAndComment/:id", checkIfOrganization, (req, res) => {
    console.log("Received PUT-request /updateStatusAndComment/:id");
	caseDao.updateCommentAndStatusOrg(req.params.id, req.body, (status, data) => {
    console.log(req.params.id);
		res.status(status);
		res.json(data);
	});
});*/


app.put("/updateStatusAndComment/:id", checkIfOrganization, (req, res) => {

   let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            console.log("DECODED: ", decoded.email);
            console.log("body: ", req.body);

            caseDao.updateCommentAndStatusOrg(req.params.id, req.body, (status, data) => {
                res.status(status);
                res.json(data);
                console.log('::::::::::::::::::updating case');

                statusDao.getOneById(req.body.status, (status,data) => {
                    let statusName = data[0].description;
                    console.log(':::::::::::::::::: fetching status name');

                    caseDao.getCaseReplyMail(req.params.id, (status,data) => {
                        console.log(':::::::::::::::::: fetching reply mail and sending:::::::::::::::::::::::::::::.');
                        console.log(data);

                        if(data[0] === undefined) {
                            console.log('undefined data from replymail');
                        }
                        else if(data[0].subscription === 1) {
                            const mailOptionsCase = {
                                from: 'bedrehverdagshelt@gmail.com',
                                to: data[0].email,
                                subject: 'Din sak har blitt oppdaert!',
                                html:
                                    '<h1> Status: ' + statusName + ' </h1>' +
                                    '<p> "' + req.body.comment + '" </p>' +
                                    '<p> Logg inn på hverdagshelt for å se siste oppdatering! :) </p>'
                            };

                            transporter.sendMail(mailOptionsCase, function(error, info){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                    console.log(mailOptionsCase);
                                }
                            }); //transporter
                        } //subscribed ifelse
                        else {
                            console.log('user does not want spam');
                        }
                    }); //reply
                }); //status
            }); //update
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    }); //JWT
}); //APP

app.get("/getCasesOnOrgID/:id", checkIfOrganization,  (req, res) => {
	caseDao.getCasesForOrganization(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Change status_id on one case by case_id
 */
app.put("/changeCaseStatus/:case_id/:status_id", (req, res) => {
	caseDao.updateCaseStatus(req.params.case_id, req.params.status_id, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Change/insert comment on one case by case_id
 */
app.put("/changeCaseComment/:case_id/:comment", checkIfOrganization, (req, res) => {
    console.log(req.params.case_id)
	caseDao.updateCaseComment(req.params.case_id, req.params.comment, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

/**
 * Update case with {employee_id, comment, org_id, status_id, case_id} for employees
 */
app.put("/updateCaseEmployee", checkIfEmployee, (req, res) => {

   let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log("DECODED: ", decoded.userid)
            console.log("DECODED: ", decoded.email);
            console.log("body: ", req.body);

            caseDao.updateCaseByEmployee(req.body, (status, data) => {
                res.status(status);
                res.json(data);
                console.log('::::::::::::::::::updating case');

                orgDao.getOrgReplyMail(req.body.org_id, (status,data) => {

                    if(!data[0]) {
                        console.log('ikke tildelt en bedrift, sender ikke e-post');
                    } else {

                    const mailOptionsCaseOrg = {
                        from: 'bedrehverdagshelt@gmail.com',
                        to: data[0].email,
                        subject: 'En sak har blitt tildelt din bedrift',
                        html:
                        '<h1> Saks id: ' + req.body.case_id + '</h1>' +
                        '<p> Kommentar:' + req.body.comment + '</p>'
                    };

                    transporter.sendMail(mailOptionsCaseOrg, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent to Organization: ' + info.response);
                            console.log(mailOptionsCaseOrg);
                        }
                    });
                    }

                    statusDao.getOneById(req.body.status, (status,data) => {
                        let statusName = data[0].description;
                        console.log(':::::::::::::::::: fetching status name');

                        caseDao.getCaseReplyMail(req.body.case_id, (status,data) => {
                            console.log(':::::::::::::::::: fetching reply mail and sending:::::::::::::::::::::::::::::.');
                            console.log(data[0]);
                            if(!data[0]) {
                                console.log("Ingen hverdagshelt tildelt denne saken!");
                            }
                            else if(data[0].subscription === 1) {
                                const mailOptionsCase = {
                                    from: 'bedrehverdagshelt@gmail.com',
                                    to: data[0].email,
                                    subject: 'Din sak har blitt oppdatert!',
                                    html:
                                        '<h1> Status: ' + statusName + ' </h1>' +
                                        '<p> "' + req.body.comment + '" </p>' +
                                        '<p> Logg inn på hverdagshelt for å se siste oppdatering! :) </p>'
                                };

                                transporter.sendMail(mailOptionsCase, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        console.log(mailOptionsCase);
                                    }
                                }); //transporter
                            } //subscribed ifelse
                            else {
                                console.log('user does not want spam');
                            }
                        }); //reply
                    }); //status
                });
            }); //update
        } else {
            console.log("Feil innlogging! Sender brevbombe.");
            res.sendStatus(403);
        }
    }); //JWT
}); //APP

// End Cases

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// GEO (Place, kommune, fylke)

/**
 * Gets all communes from Place in DB
 */
app.get("/getCommunes", (req, res) => {
	geodao.getAllCommunes((status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Gets the communes county
 */
app.get("/getCommunesCounty/:id", (req, res) => {
	geodao.getCommunesCounty(req.params.id, (status, data) => {
		res.status(status);
		res.json(data);
	});
});

app.get("/CommuneName/:commune", (req: Request, res: Response) =>{
    console.log("Received get-request on endpoint /CommuneName/"+req.params.commune);
    geodao.getCommuneName(req.params.commune, (status, data) =>{
        res.status(status);
        res.json(data);
        console.log(data[0].navn);
    });
});

/**
 * Gets all communes from kommune in DB
 */
app.get("/getCommunesKommune", (req, res) => {
	geodao.getCommunesFromKommune((status, data) => {
		res.status(status);
		res.json(data);
	});
});

// GEO END

//
//
//
//
//
//
//
//
//
//
//
//


// Statistics

/**
 * Get statistics for registered cases past 7 days
 */
app.get("/statistics/cases", (req, res) => {
	statDao.getCaseRegPast7Days((status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Gets a count of cases registered on categories in database
 */
app.get("/statistics/casesCategory", (req, res) => {
	statDao.getAllCasesCategory((status, data) => {
		res.status(status);
		res.json(data);
	});
});

/**
 * Gets count of all users of the system in one table
 */
app.get("/statistics/countUsers", (req, res) => {
	statDao.getCountAllUsers((status, data) => {
		res.status(status);
		res.json(data);
	});
});

// End statistics

//
//
//
//
//
//
//
//
//
//
//
//
//
//

// STATUS


/** Get all status */
app.get("/status", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    statusDao.getAllStatuses((status, data) => {
        res.status(status);
        res.json(data);
    });
});

/** Get status by ID */
app.get("/status/:id", (req, res) => {
    console.log("Received get-request on endpoint /allCases");
    statusDao.getOneById( req.params.id, (status, data) => {
        res.status(status);
        res.json(data);

    });
});

// STATUS END

//
//
//
//
//
//
//
//
//
//
//
//
//


// Login, Verification and Password

/** Send password reset link for user*/

app.post("/reset/user/:email", (req, res) => {
    console.log("/reset fikk POST request");
    console.log("email: " + req.params.email);
    var promise1 = new Promise(function(resolve, reject) {
        userdao.getUserByEmail(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
            resolve(data);
        });
    });

    promise1.then(data => {
        console.log(data[0].user_id);
        if (data[0] == undefined) {
        console.log(':::email entered not found in database::::');
        } else {
        console.log(':::valid email entered:::');
        const token = crypto.randomBytes(20).toString('hex');
        console.log(':::::::::' + token);
        userdao.updateResetPasswordToken( {resetPasswordToken: token, resetPasswordExpire: Date.now() + 3600000}, data[0].user_id, (status, data) => {
        });

        const mailOptions = {
            from: `bedrehverdagshelt@gmail.com`,
            to: `${req.params.email}`,
            subject: `Link To Reset Password`,
            text:
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
                `http://localhost:3000/#/reset/user/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        }; // mailoption end

        console.log('sending mail');
        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }

        }); // transporter end
        } //ifelse end

    });
});

/** Send password reset link for employee*/

app.post("/reset/emp/:email", (req, res) => {
    console.log("/reset fikk POST request");
    console.log("email: " + req.params.email);
    var promise1 = new Promise(function(resolve, reject) {
        empDao.getEmployeeByEmail(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
            resolve(data);
        });
    });

    promise1.then(data => {
        console.log(data[0].employee_id);
        if (data[0] == undefined) {
        console.log(':::email entered not found in database::::');
        } else {
        console.log(':::valid email entered:::');
        const token = crypto.randomBytes(20).toString('hex');
        console.log(':::::::::' + token);
        empDao.updateResetPasswordToken( {resetPasswordToken: token, resetPasswordExpire: Date.now() + 3600000}, data[0].employee_id, (status, data) => {
        });

        const mailOptions = {
            from: `bedrehverdagshelt@gmail.com`,
            to: `${req.params.email}`,
            subject: `Link To Reset Password`,
            text:
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
                `http://localhost:3000/#/reset/emp/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        }; // mailoption end

        console.log('sending mail');
        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }

        }); // transporter end
        } //ifelse end

    });
});

/** Send password reset link for organization*/

app.post("/reset/org/:email", (req, res) => {
    console.log("/reset/org/:email fikk POST request");
    console.log("email: " + req.params.email);
    var promise1 = new Promise(function(resolve, reject) {
        orgDao.getOrgByEmail(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
            resolve(data);
        });
    });

    promise1.then(data => {
        console.log(data[0].org_id);
        if (data[0] == undefined) {
        console.log(':::email entered not found in database::::');
        } else {
        console.log(':::valid email entered:::');
        const token = crypto.randomBytes(20).toString('hex');
        console.log(':::::::::' + token);
        orgDao.updateResetPasswordToken( {resetPasswordToken: token, resetPasswordExpire: Date.now() + 3600000}, data[0].org_id, (status, data) => {
        });

        const mailOptions = {
            from: `bedrehverdagshelt@gmail.com`,
            to: `${req.params.email}`,
            subject: `Link To Reset Password`,
            text:
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
                `http://localhost:3000/#/reset/org/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        }; // mailoption end

        console.log('sending mail');
        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }

        }); // transporter end
        } //ifelse end

    });
});

/** Token verification for user */

 app.get('/tokenVerification/user/:token', (req: Request, res: Response) => {
    console.log("Received GET-request for /tokenVerification/user/:token");

    userdao.getUserFromResetToken(req.params.token, (status, data) => {
        if (data[0] === undefined) { //If reset token is not assigned to a user.
            console.log(':::::::::::::::::::::::Token not accepted.');
            res.status(500).json("Token not accepted.");

        }else if (data[0].resetPasswordExpire < Date.now()) {
            console.log('now: ' + Date.now());
            console.log('exp: ' + data[0].resetPasswordExpire); //token expire
            console.log('Token expired');
            res.status(400).json("Token expired");


        } else { //

            console.log(':::::::::::::::::::.Token accepted, change password allowed.');

            res.status(200).json(data);
        }
    });
 });

/** Token verification for employee */

 app.get('/tokenVerification/emp/:token', (req: Request, res: Response) => {
    console.log("Received GET-request for /tokenVerification/user/:token");

    empDao.getUserFromResetToken(req.params.token, (status, data) => {
        if (data[0] === undefined) { //If reset token is not assigned to a user.
            console.log(':::::::::::::::::::::::Token not accepted.');
            res.status(500).json("Token not accepted.");

        }else if (data[0].resetPasswordExpire < Date.now()) {
            console.log('now: ' + Date.now());
            console.log('exp: ' + data[0].resetPasswordExpire); //token expire
            console.log('Token expired');
            res.status(400).json("Token expired");


        } else { //

            console.log(':::::::::::::::::::.Token accepted, change password allowed.');
            res.status(200).json(data);
        }
    });
 });

 /** Token verification for organization */

 app.get('/tokenVerification/org/:token', (req: Request, res: Response) => {
    console.log("Received GET-request for /tokenVerification/user/:token");

    orgDao.getUserFromResetToken(req.params.token, (status, data) => {
        if (data[0] === undefined) { //If reset token is not assigned to a user.
            console.log(':::::::::::::::::::::::Token not accepted.');
            res.status(500).json("Token not accepted.");

        }else if (data[0].resetPasswordExpire < Date.now()) {
            console.log('now: ' + Date.now());
            console.log('exp: ' + data[0].resetPasswordExpire); //token expire
            console.log('Token expired');
            res.status(400).json("Token expired");


        } else { //

            console.log(':::::::::::::::::::.Token accepted, change password allowed.');
            res.status(200).json(data);
        }
    });
 });


 /**
 * Verifies old password and updates new password for user.
 */

app.put('/userVerification', (req: Request, res: Response) => {
    console.log("app.get(/userverification):::::" + req.body.oldPassword + " => " + req.body.newPassword);

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log(decoded);
            let dbHash;

            userdao.getHashedPWord(decoded.userid, (status, data) => {
                let savedPassword = data[0].password;
                let passwordData = sha512(req.body.oldPassword, data[0].secret);
                dbHash = passwordData.passwordHash === savedPassword;

                if (dbHash) {
                    userdao.updateUserPassword({user_id: decoded.userid, password: req.body.newPassword}, (status,data) => {
                            console.log("STATUS: ", "200");
                            res.status(200).json('Password verified, and changed.');

                    });

                } else {
                    console.log("STATUS: ", "500");
                    res.status(500).json("Wrong password. Try again");
                }
            });

        } else {
            console.log("Feil innlogging! Sender brevbombe.");
        }
    });
});

/** UpdateUserPassword */
app.put('/updateUserPassword', (req: Request, res:Response) => {
    console.log('PUT-request for updatePassword');
    console.log(req.body);

    userdao.updateUserPassword({user_id: req.body.user_id, password: req.body.password}, (status,data) => {
        console.log("STATUS: ", "200");
        res.status(200).json('Password verified, and changed.');

    });
});


/**
 * Verifies old password and updates new password for employee.
 */

app.put('/employeeVerification', (req: Request, res: Response) => {
    console.log("app.put(/employeeVerification):::::" + req.body.oldPassword + " => " + req.body.newPassword);

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log('decoded: ' +decoded);
            console.log('body: ' + req.body)
            let dbHash;

            employeeDao.getHashedPWord(decoded.userid, (status, data) => {
                let savedPassword = data[0].password;
                let passwordData = sha512(req.body.oldPassword, data[0].secret);
                dbHash = passwordData.passwordHash === savedPassword;

                if (dbHash) {
                    employeeDao.updateEmpPassword({emp_id: decoded.userid, password: req.body.newPassword}, (status,data) => {
                            console.log("STATUS: ", "200");
                            res.status(200).json('Password verified, and changed.');

                    });

                } else {
                    console.log("STATUS: ", "500");
                    res.status(500).json("Wrong password. Try again");
                }
            });

        } else {
            console.log("Feil innlogging! Sender brevbombe.");
        }
    });
});


/**
 * Verifies old password and updates to new password for organization.
 */

app.put('/organizationVerification', (req: Request, res: Response) => {
    console.log("app.put(/organizationVerification):::::" + req.body.oldPassword + " => " + req.body.newPassword);

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    jwt.verify(token, privateKey, function(err, decoded)  {
        if (decoded) {
            console.log('decoded: ' +decoded);
            console.log('body: ' + req.body)
            let dbHash;

            orgDao.getHashedPWord(decoded.userid, (status, data) => {
                let savedPassword = data[0].password;
                let passwordData = sha512(req.body.oldPassword, data[0].secret);
                dbHash = passwordData.passwordHash === savedPassword;

                if (dbHash) {
                    orgDao.updateOrgPassword({org_id: decoded.userid, password: req.body.newPassword}, (status,data) => {
                            console.log("STATUS: ", "200");
                            res.status(200).json('Password verified, and changed.');

                    });

                } else {
                    console.log("STATUS: ", "500");
                    res.status(500).json("Wrong password. Try again");
                }
            });

        } else {
            console.log("Feil innlogging! Sender brevbombe.");
        }
    });
});



app.post("/loginhh", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        userdao.getUserByEmail(req.body.email1, (status, data) => {

            if (data[0] != undefined) {

                console.log("data email: " + data[0].password);

                const lagretPass = data[0].password;
                const user_id = data[0].user_id;
                const email = data[0].email;
                const passwordData = sha512(req.body.password1, data[0].secret);
                // console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve({valid : true, email : email, user_id : user_id});
                } else {
                    resolve(false);
                }} else { resolve({valid: false}); }

        });
    })

    promise1.then(function (value) {
        // console.log("Value: ", value)
        if (value.valid) {
            userdao.getUserByEmail(req.body.email1, (status, data) => {
                // console.log("STATUS: ", status);
                let token = jwt.sign({email: value.email, userid: value.user_id}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, username: data[0].username, user_id: data[0].user_id, name: data[0].name});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email1);
            });

        } else {

            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Brukernavn eller passord er ikke riktig"});
            res.status(401);

        }
    });
});


app.post("/logink", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        employeeDao.getEmployeeByEmail(req.body.email3, (status, data) => {

            if (data[0] != undefined) {


                console.log("data email: " + req.body.email3);
                const lagretPass = data[0].password;
                const employee_id = data[0].employee_id;
                const email = data[0].email;
                const passwordData = sha512(req.body.password3, data[0].secret);
                // console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve({valid : true, email : email, employee_id : employee_id});
                } else {
                    resolve(false);
                }} else { resolve({valid: false}); }
        });
    })

    promise1.then(function (value) {
        // console.log("Value: ", value)
        if (value.valid) {
            employeeDao.getEmployeeByEmail(req.body.email3, (status, data) => {

                console.log("employee_id; " + value.employee_id)

                let token = jwt.sign({email: value.email, userid: value.employee_id}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, username: data[0].username, user_id: data[0].employee_id, name: data[0].name, commune: data[0].commune, superuser: data[0].superuser});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email3);
            });

        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Brukernavn eller passord er ikke riktig"});
            res.status(401);

        }
    });
});



app.post("/loginb", (req, res) => {

    let promise1 = new Promise(function (resolve, reject) {
        employeeDao.getBedriftByEmail(req.body.email2, (status, data) => {
            if (data[0] != undefined) {

                console.log("data email: " + req.body.email2);
                const lagretPass = data[0].password;
                const org_id = data[0].org_id;
                const email = data[0].email;
                const passwordData = sha512(req.body.password2, data[0].secret);
                console.log(lagretPass.localeCompare(passwordData.passwordHash));

                if (passwordData.passwordHash == lagretPass) {
                    resolve({valid : true, email : email, org_id : org_id});
                } else {
                    resolve(false);
                }} else { resolve({valid: false}); }
        });
    })

    promise1.then(function (value) {
        if (value.valid) {
            employeeDao.getBedriftByEmail(req.body.email2, (status, data) => {
                let token = jwt.sign({email: value.email, userid: value.org_id}, privateKey, { expiresIn: 60000 });
                res.json({jwt: token, reply: "Success", email: data[0].email, user_id: data[0].org_id, name: data[0].name});
                console.log("Brukernavn & passord ok, velkommen " + req.body.email2);
            });

        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.json({reply: "Brukernavn eller passord er ikke riktig"});
            res.status(401);

        }
    });
})



function checkIfLoggedIn(req, res, next) {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        jwt.verify(token, privateKey, function(err, decoded)  {
            console.log("decoded; ", decoded)
            console.log("decoded; ", decoded.email)
            if (decoded && decoded.email) {


                /*
                  let promise1 = new Promise(function (resolve, reject) {


                      // console.log("asynkron?", decoded.email)

                      empDao.searchEmail(decoded.email, (status, data) => {
                        //  console.log("data[0].verify: " + data[0].verify)
                          resolve(data[0].verify);
                      });
                  })

                  console.log("promise1 ;" , promise1);

                  promise1.then(function () {

                      // console.log("data[0].verify; ", data[0].verify);

                      if (decoded && decoded.email && (data[0].verify === 1)) {
                          next();
                      } else {
                          console.log("Feil innlogging! Sender brevbombe.");
                          res.sendStatus(403);
                      }

                  })


          */





                next();
            } else {
                console.log("Feil innlogging! Sender brevbombe.");
                res.sendStatus(403);
            }
        });
    } catch (err) {
        console.log("Oops: " + err)
        console.log("Feil innlogging! Sender brevbombe.");
        // res.sendStatus(403);
        return false;
    }
}



function checkIfEmployee(req, res, next) {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        // console.log ("JSHKDJSHKJFHK: ", req.headers);
        jwt.verify(token, privateKey, function(err, decoded)  {
            if (decoded && decoded.email) {
                  let promise1 = new Promise(function (resolve, reject) {
                      empDao.searchEmployeeEmail(decoded.email, (status, data) => {
                          // console.log("fra emdao promise: " + data[0].verify);
                          if (!isNaN(data[0].verify)) {
                              resolve(data[0].verify);
                          } else {
                              reject(console.log("ererrerererer"));
                          }
                      });
                  }  );

                  promise1.then(function (value) {
                      console.log("decoded.email : " + decoded.email);
                      console.log("decoded : ", decoded);
                      console.log("value : " + value);

                      if (decoded && decoded.email && (value === 1)) {
                          console.log("******************  Operasjonen gikk gjennom!  ******************")
                          next();
                      } else {
                          console.log("Feil innlogging! Sender brevbombe. 1");
                          res.sendStatus(403);
                      }
                  });
            } else {
                console.log("Feil innlogging! Sender brevbombe.");
                res.sendStatus(403);
            }
        });
    } catch (err) {
        // console.log("Oops: " + err)
        // console.log("Feil innlogging! Sender brevbombe.");
        res.sendStatus(403);
        return false;
    }
}



function checkIfOrganization(req, res, next) {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log ("JSHKDJSHKJFHK: ", req.headers);
        jwt.verify(token, privateKey, function(err, decoded)  {
            if (decoded && decoded.email) {
                let promise1 = new Promise(function (resolve, reject) {
                    empDao.searchOrgEmail(decoded.email, (status, data) => {
                        console.log("fra emdao promise: " + data[0].verify);
                        if (!isNaN(data[0].verify)) {
                            resolve(data[0].verify);
                        } else {
                            reject(console.log("ererrerererer"));
                        }
                    });
                }  );

                promise1.then(function (value) {
                    // console.log("decoded.email : " + decoded.email);
                    // console.log("decoded : " + decoded);
                    // console.log("value : " + value);

                    if (decoded && decoded.email && (value === 1)) {
                        console.log("******************  Operasjonen gikk gjennom!  ******************")
                        next();
                    } else {
                        console.log("Feil innlogging! Sender brevbombe 1.");
                        res.sendStatus(403);
                    }
                });
            } else {
                console.log("Feil innlogging! Sender brevbombe 2.");
                res.sendStatus(403);
            }
        });
    } catch (err) {
        // console.log("Oops: " + err)
        console.log("Feil innlogging! Sender brevbombe 3.");
        res.sendStatus(403);
        return false;
    }
}



function checkIdsdsdsfOrganization(req, res, next) {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        // console.log ("JSHKDJSHKJFHK: ", req.headers);
        jwt.verify(token, privateKey, function(err, decoded)  {
            if (decoded && decoded.email) {
                let promise1 = new Promise(function (resolve, reject) {
                    empDao.searchOrgEmail(decoded.email, (status, data) => {
                        // console.log("fra emdao promise: " + data[0].verify);
                        if (!isNaN(data[0].verify)) {
                            resolve(data[0].verify);
                        } else {
                            reject(console.log("ererrerererer"));
                        }
                    });
                }  );

                promise1.then(function (value) {
                    console.log("decoded.email : " + decoded.email);
                    console.log("decoded : ",decoded);
                    console.log("value : " + value);

                    if (decoded && decoded.email && (value === 1)) {
                        console.log("******************  Operasjonen gikk gjennom!  ******************")
                        next();
                    } else {
                        // console.log("Feil innlogging! Sender brevbombe.");
                        res.sendStatus(403);
                    }
                });
            } else {
                console.log("Feil innlogging! Sender brevbombe.");
                res.sendStatus(403);
            }
        });
    } catch (err) {
        // console.log("Oops: " + err)
        // console.log("Feil innlogging! Sender brevbombe.");
        res.sendStatus(403);
        return false;
    }
}


function checkIfUser(req, res, next) {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log ("JSHKDJSHKJFHK: ", req.headers);
        jwt.verify(token, privateKey, function(err, decoded)  {
            if (decoded && decoded.email) {
                let promise1 = new Promise(function (resolve, reject) {
                    empDao.searchUserEmail(decoded.email, (status, data) => {
                        console.log("fra emdao promise: " + data[0].verify);
                        if (!isNaN(data[0].verify)) {
                            resolve(data[0].verify);
                        } else {
                            reject(console.log("ererrerererer"));
                        }
                    });
                }  );

                promise1.then(function (value) {
                    console.log("decoded.email : " + decoded.email);
                    console.log("decoded : " + decoded);
                    console.log("value : " + value);

                    if (decoded && decoded.email && (value === 1)) {
                        console.log("******************  Operasjonen gikk gjennom!  ******************")
                        next();
                    } else {
                        console.log("Feil innlogging! Sender brevbombe.");
                        res.sendStatus(403);
                    }
                });
            } else {
                console.log("Feil innlogging! Sender brevbombe.");
                res.sendStatus(403);
            }
        });
    } catch (err) {
        // console.log("Oops: " + err)
        // console.log("Feil innlogging! Sender brevbombe.");
        res.sendStatus(403);
        return false;
    }
}

// REFRESHING TOKEN
app.use("/refreshtoken", (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok, så du får ikke refreshet");
            res.status(401);
            res.json({ error: "No old token detected, no refresh for you!" });
        } else {
            console.log("/Refreshtoken: decoded.userid from token: " + decoded.userid)
            console.log()
            let token = jwt.sign({
                email: decoded.email, userid: decoded.userid
            }, privateKey, { expiresIn: 60000 });
            res.json({ jwt: token });
            // console.log(lib.verify.token)
        }
    });
});




// LOGIN, VERIFICATION, PASSWORD END
//
//
//
//
//
//
//
//
//
//
//
//
//



const server = app.listen(process.env.PORT || "8080", function () {
    console.log("App listening on port %s", server.address().port);
    console.log("Press Ctrl+C to quit");
});

if(process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', function(err) {
        console.error('FATAL: Uncaught exception.');
        console.error(err.stack||err);
        setTimeout(function(){
            process.exit(1);
        }, 100);
    });
}
