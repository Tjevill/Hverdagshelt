// @flow

var mysql = require('mysql');
jest.setTimeout(10000);

const Casedao = require("../casesdao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'oyvinval',
  debug: false,
  multipleStatements: true
});


let casedao = new Casedao(pool);
beforeAll(done => {
  runsqlfile('dao/tests/create_table.sql', pool, () => {
    runsqlfile('dao/tests/create_testdata.sql', pool, done);
  });
});

test('get all cases from database', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(11);
    done();
  }
  casedao.getAllCases(callback);
});

test('get case with id 1 from database', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe('test One');
    done();
  }
  casedao.getOne('1', callback);
});