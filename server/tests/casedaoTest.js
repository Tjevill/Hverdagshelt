// @flow

var mysql = require('mysql');
jest.setTimeout(10000);

const Casedao = require("../dao/casesdao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'benos',
  password: 'uJHtIkcl',
  database: 'benos',
  debug: false,
  multipleStatements: true
});

let casedao = new Casedao(pool);
beforeAll(done => {
  runsqlfile('dao/tests/create_tables.sql', pool, () => {
    runsqlfile('dao/tests/create_testdata.sql', pool, done);
  });
});

test('getAllCases from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(11);
    done();
  }
  casedao.getAllCases(callback);
});

test('getCaseOnUser from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].description).toBe('test One');
    done();
  }
  casedao.getOne(1,callback);
});

test('getCaseOnUser from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(2);
    done();
  }
  casedao.getCaseOnUser(31,callback);
});

test('getOneZip from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(10);
    done();
  }
  casedao.getOneZip(7012,callback);
});

test('searchCaseCategory from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(10);
    done();
  }
  casedao.searchCaseCategory(1,callback);
});

test('searchCaseDescription from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].description).toBe("tætt vannhøll");
    done();
  }
  casedao.searchCaseDescription("Vann",callback);
});

// will be uncommented when we manage to test the data received from a sql function call
/*
test('getNumberOfCases from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data[0]).toBe({"x": 11});
    done();
  }
  casedao.getNumberOfCases(callback);
}); */


test('searchCaseDescription from casedao.js', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].description).toBe("tætt vannhøll");
    done();
  }
  casedao.searchCaseDescription("Vann",callback);
});

// Database altering tests Here

test('create from casedao.js', done => {
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
      user_id: "34",
      category_id: "1",
      picture: "url",
      email: "benos@stud.ntnu.no"
    }
    ,callback);
});