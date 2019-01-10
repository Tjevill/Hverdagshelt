const Dao = require("./dao.js");

'use strict';
let crypto = require('crypto');

type jsonUpdate = {
	org_id: number,
	organizationnumber: string,
	name: string,
	email: string
};

type jsonUpdatePWordOrg = {
	org_id: number,
	password: string
}

type jsonAddOrg = {
	org_id: number,
	organizationnumber: string,
	name: string,
	email: string,
	password: string,
	secret: string
}

let genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length);   /** return required number of characters */
};

let sha512 = function(password, salt){
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	let value = hash.digest('hex');
	return {
		salt:salt,
		passwordHash:value
	};
};

module.exports = class OrgDao extends Dao {
	
	getAll (callback: mixed) {
		super.query(
			"select * from Organization",
			[],
			callback
		);
	}
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select * from Organization where org_id = ?",
			[id],
			callback
		);
	}
	
	/**
	 * Use this method for updating personal data, except password
	 * @param json
	 * @param callback
	 */
	updateOrg (json: jsonUpdate, callback: mixed){

		let val = [json.organizationnumber, json.name, json.email, json.org_id];
		super.query(
			"update Organization set organizationnumber = ?, name = ?, email = ? where org_id = ?",
			val,
			callback
		);
	}
	
	/**
	 * Use this method for changing password for the organization
	 * @param json
	 * @param callback
	 */
	updateOrgPassword(json: jsonUpdatePWordOrg, callback: mixed){
		let salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
		let passwordData = sha512(json.password, salt);
		let val = [passwordData.passwordHash, passwordData.salt, json.org_id];
		super.query(
			"update Organization set password = ?, secret = ? where org_id = ?",
			val,
			callback
		);
	}
	
	deleteOrgByID(id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from Organization where org_id = ?",
			[val],
			callback
		);
	}
	
	addOrg(json: jsonAddOrg, callback) {
		let salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
		let passwordData = sha512(json.password, salt);
		let val = [json.organizationnumber, json.name, json.email, passwordData.passwordHash, passwordData.salt];
		super.query(
			"insert into Organization (organizationnumber, name, email, password, secret) values (?,?,?,?,?)",
			val,
			callback
		);
	}
	
	getCountOrg(callback: mixed) {
		super.query(
			"select COUNT(*) as x from Organization",
			[],
			callback
		);
	}
	
};