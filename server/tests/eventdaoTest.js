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

test('getAllEvents', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(3);
    done();
  }
  eventdao.getAllEvents(callback);
});
