// @flow

const mysql = require('mysql');
jest.setTimeout(50000);
const config = require('../../config.js');

const CategoryDao = require("../dao/categorydao.js");
const runsqlfile = require('./runsqlfile.js');

const host = config.testdb.host;
const user = config.testdb.user;
const database = config.testdb.database;
const password = config.testdb.password;

// GitLab CI Pool
let pool = mysql.createPool({
	connectionLimit: 1,
	host: host,
	user: user,
	password: password,
	database: database,
	debug: false,
	multipleStatements: true
});

let categorydao = new CategoryDao(pool);

beforeAll(done => {
	runsqlfile('dao/tests/create_tables.sql', pool, () => {
		runsqlfile('dao/tests/create_testdata.sql', pool, done);
	});
});

afterAll(done => {
	runsqlfile('dao/tests/delete_testdata.sql', pool, done);
});

/**
 * Gets all categories from Category table in DB
 */
test('getAllCategories from categorydao.js', done => {
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(2);
		done();
	}
	categorydao.getAll(callback);
});

/**
 * Get one category by its id from Category table in DB
 */
test('getOneByID from categorydao.js', done => {
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(1);
		expect(data[0].description).toEqual("Elektrisitet");
		done();
	}
	categorydao.getOneByID(1, callback);
});

/**
 * Update one category by its id in Category table in DB
 */
test('updateCategory from categorydao.js', done => {
	
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(1);
		expect(data[0].description).toEqual("Vei");
		done();
	}
	
	categorydao.updateCategory({description: "Vei", category_id: 1}, callbackA);
	
	function callbackA () {
		categorydao.getOneByID(1, callback);
	}
	
});

/**
 * Adding new category to Category table in DB
 */
test('addCategory from categorydao.js', done => {
	
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(1);
		expect(data[0].description).toEqual("Vann");
		done();
	}
	
	categorydao.addCategory({description: "Vann"}, callbackA);
	
	function callbackA () {
		categorydao.getOneByID(3, callback);
	}
	
});
/**
 * Gets count of all categories in Category table in DB
 */
test('getCountCategories from categorydao.js', done => {
	
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data[0].x).toBe(3);
		done();
	}
	
	categorydao.getCountCategories(callback);

	
});

/**
 * Deletes on category from Category table in DB
 */
test('deleteCategoryByID from categorydao.js', done => {
	
	function callback(status, data) {
		console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
		expect(data.length).toBe(2);
		done();
	}
	
	categorydao.deleteCategoryByID(1, callbackA);
	
	function callbackA () {
		categorydao.getAll(callback);
	}
	
});


