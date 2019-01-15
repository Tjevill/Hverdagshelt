// @flow

let mysql = require('mysql');
jest.setTimeout(10000);

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

afterEach(() => {
 pool.end();
});

test('getAllEvents', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(3);
    done();
  }
  eventdao.getAllEvents(callback);
});

test('getOne', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data[0].name).toBe("Test Event 1");
    done();
  }
  eventdao.getOne(1, callback);
});

test('searchEvent', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(3);
    done();
  }
  eventdao.searchEvent("Event",callback);
});

test('onDateAsc', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(3);
    done();
  }
  eventdao.onDateAsc(2019,callback);
});

test('onDateDesc', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(3);
    expect(data[0].name).toBe("Test Event 1");
    done();
  }
  eventdao.onDateDesc(2019,callback);
});

test('createEvent', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    expect(data.insertId).toBe(4);
    done();
  }
  eventdao.createEvent(
    { 
        name:"Test Ben på piano",
        date:"2019-07-10 16:00:0", 
        description:"Låter knall bra",
        zipcode:"7021"
            
    }
      ,callback
    );
});

test('updateEvent', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    done();
  }
  eventdao.updateEvent(
      2,
    { 
        name:"Test Update",
        date:"2019-07-10 16:00:0", 
        description:"Jest made this update",
        zipcode:"7021"
            
    }
      ,callback
    );
});

test('deleteEvent', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    
    done();
  }
  eventdao.deleteEvent(1,callback);
});


