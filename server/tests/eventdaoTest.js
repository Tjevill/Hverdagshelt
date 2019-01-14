// @flow

let mysql = require('mysql');
jest.setTimeout(10000);

const Eventdao = require("../dao/eventdao.js");
const runsqlfile = require('./runsqlfile.js');

// GitLab CI Pool
let pool = mysql.createPool({
  connectionLimit: 1,
  host: "praxiz2.mysql.domeneshop.no",
  user: "praxiz2",
  password: "e3rquLfn",
  database: "praxiz2",
  debug: false,
  multipleStatements: true
});

let eventdao = new Eventdao(pool);
beforeAll(done => {
  runsqlfile('dao/tests/create_tables.sql', pool, () => {
    runsqlfile('dao/tests/create_testdata.sql', pool, done);
  });
});