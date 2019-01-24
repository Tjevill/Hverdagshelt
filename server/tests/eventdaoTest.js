// @flow

let mysql = require('mysql');
jest.setTimeout(50000);

const Eventdao = require("../dao/eventdao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
let pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'benos',
  password: 'uJHtIkcl',
  database: 'benos',
  debug: false,
  multipleStatements: true
});

let eventdao = new Eventdao(pool);

beforeAll(done => {
  runsqlfile('dao/tests/create_tables.sql', pool, () => {
    runsqlfile('dao/tests/create_testdata.sql', pool, done);
  });
});

afterAll(done => {
	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});


/**
 * Get all future events.
 * To get this test to pass, make sure there are future events in the testdata-set!
 */
test("Get all future events", done =>{

  function callback(status, data){

    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data.length).toBe(10);
    done()
  }
  eventdao.getAllEvents(callback);
});


/**
 * Get one event from the db using event_id.
 */
test("Get one event from db with event_id", done =>{

  function callback(status, data){

    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data[0].name).toBe("Madrugada");
    expect(data[0].event_id).toBe(1);
    expect(data[0].zipcode).toBe("8015");
    done();
  }
  eventdao.getOne(1, callback);
});


/**
 * Search for an event on name in the db
 */
test("Search for event in db by name", done => {

  function callback(status, data){

    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data.length).toBe(2);
    done();
  }
  eventdao.searchEvent("Ben", callback);
});


/**
 * Create one event and put it in the db
 */
test("Create one event", done => {

  function callback(status, data){
    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data[0].name).toBe("Testevent");
    expect(data[0].description).toBe("Testdesc");
    expect(data[0].zipcode).toBe("1337");
    done();
  }
  eventdao.createEvent(
      {
        name : "Testevent",
        date : "2019-09-10 16:00",
        description: "Testdesc",
        zipcode : "1337",
        address : "Testveien 2",
        venue : "Test"
      },
      callbackB
  );

  function callbackB(){
    eventdao.searchEvent("Testevent", callback);
  }
});


/**
 * Delete one event in the db using event_id
 */
test("Delete one event in the db", done => {

  function callback(status, data){

    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data.length).toBe(10);
    done();
  }
  eventdao.deleteEvent(32, callbackB);

  function callbackB(){
    eventdao.getAllEvents(callback);
  }
});


/**
 * Update an existing event in the db.
 */
test("Update one event in the db", done =>{

  function callback(status, data){

    console.log("Test callback: status = "+status+" , data = "+JSON.stringify(data));
    expect(data[0].name).toBe("Testedit");
    expect(data[0].description).toBe("testedityo");
    expect(data[0].zipcode).toBe("7331");
    expect(data[0].address).toBe("editveien 2");
    expect(data[0].venue).toBe("edited");
    done();
  }
  eventdao.updateEvent(1,
      {
        name : "Testedit",
        date : "2019-09-10 16:00",
        description: "testedityo",
        zipcode : "7331",
        address: "editveien 2",
        venue: "edited"
      },
      callbackB
  );

  function callbackB(){
    eventdao.getOne(1, callback);
  }
});

















