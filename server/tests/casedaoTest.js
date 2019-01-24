// @flow

let mysql = require('mysql');
jest.setTimeout(50000);
//const config = require('../../config.js');

const Casedao = require("../dao/casesdao.js");
const runsqlfile = require('./runsqlfile.js');


// const host = config.testdb.host;
// const user = config.testdb.user;
// const database = config.testdb.database;
// const password = config.testdb.password;

// GitLab CI Pool
const pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'supertestdb',
  debug: false,
  multipleStatements: true
});


let casedao = new Casedao(pool);
beforeAll(done => {
  runsqlfile('dao/tests/create_tables.sql', pool, () => {
    runsqlfile('dao/tests/create_testdata.sql', pool, done);
  });
});

// afterAll(done => {
// 	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
// });


test('getAllCases', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(11);
    done();
  }
  casedao.getAllCases(callback);
});

test('getOne', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].description).toBe('test One');
    done();
  }
  casedao.getOne(1,callback);
});

test('getOne - Non exisiting case', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(0);
    done();
  }
  casedao.getOne(0,callback);
});

test('getCaseOnUser', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(2);
    done();
  }
  casedao.getCaseOnUser(31,callback);
});

test('getOneZip', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(10);
    done();
  }
  casedao.getOneZip(7012,callback);
});

test('searchCaseCategory', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(10);
    done();
  }
  casedao.searchCaseCategory("Elektrisitet",callback);
});

test('searchCaseDescription', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].description).toBe("tætt vannhøll");
    done();
  }
  casedao.searchCaseDescription("Vann",callback);
});

// will be uncommented when we manage to test the data received from a sql function call

test('getNumberOfCases', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data[0].x).toBe(11);
    done();
  }
  casedao.getNumberOfCases(callback);
});



// Database altering tests Here

test('create', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    done();
  }
  casedao.create(
    { 
      headline: "Jest Case",
      description: "This case was made by casedaoTest.js", 
      longitude: "1",
      latitude: "2",
      zipcode: "7012",
      user_id: "2",
      category_id: "1",
      picture: "url",
      email: "benos@stud.ntnu.no"
    },
    callback
  );
});

//  Test uncommented until we are able to find why its failing.
test('updateCase', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  casedao.updateCase(
    { 
      
      description: "test update from jest", 
      longitude: "1",
      latitude: "2",
      status_id: "1",
      user_id: "1",
      category_id: "1",
      zipcode: "7012",
      headline: "update headline",
      picture: "url",
      employee_id: "1",
      org_id: "1",
      email : "benos@stud.ntnu.no",
      case_id: 10
  
    },
    callback
  );
});


test('deleteCase', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    done();
  }
  casedao.deleteCase(11,callback);
}); 