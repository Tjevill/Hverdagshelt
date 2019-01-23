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
	
	/**	Get all organizations in the db. */
	getAll (callback: mixed) {
		super.query(
			"select * from Organization",
			[],
			callback
		);
	}

	/**	Get one organization in the db 
	*	@param id - The id of the organization you with to get from the db.
	*/
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
console.log("Kall til updateOrg: ");
		let val = [json.organizationnumber, json.name, json.email, json.tel, json.org_id];
		console.log("val: ", val)
		super.query(
			"update Organization set organizationnumber = ?, name = ?, email = ?, tel = ? where org_id = ?",
			val,
			callback
		);
	}
	
	/**
	 * Use this method for changing password for the organization
	 * @param json - json-object with the id and edited password
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
	
	getHashedPWord(id: number, callback: mixed){
		super.query(
			"select * from Organization where org_id = ?",
			[id],
			callback
		);
		
	}
	
	/**	Delete organization from db.
	*	@param id - the id of the organization you wish to delete
	 */
	deleteOrgByID(id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from Organization where org_id = ?",
			[val],
			callback
		);
	}
	
	/** Create organization and add in the db.
	*	@param json - json-object with the necessary information needed.
	*					org.nr, name, emailand password.
	*/
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



    addOrganization(json, callback) {
        var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
        var passwordData = sha512(json.password, salt);
        var val = [json.organizationnumber, json.name, json.tel, json.email, passwordData.passwordHash, passwordData.salt];
        super.query(
            "insert into Organization (organizationnumber, name, tel, email, password, secret) values (?,?,?,?,?,?)",
            val,
            callback
        );
    }

	
	/**	Get the number of organizations in the db. */
	getCountOrg(callback: mixed) {
		super.query(
			"select COUNT(*) as x from Organization",
			[],
			callback
		);
	}
	
	updateResetPasswordToken(json: json, org_id: number, callback: any) {
		let val = [json.resetPasswordToken, json.resetPasswordExpire, org_id];
		super.query(
			"update Organization set resetPasswordToken = ?, expirePasswordToken = ? where org_id = ?",
			val,
			callback
		);
	}
 	
	 getUserFromResetToken(token: string, callback: any) {

		 super.query(
			"SELECT * FROM Organization WHERE resetPasswordToken = ?",
			[token],
			callback 
		 );
	 }

	  getOrgByEmail(email, callback) {
        super.query(
            "select * from Organization where email = ?",
            [email],
            callback
        );
    }

    getAllCasesOrg(org_id, callback){
		super.query(
			"SELECT * FROM Cases WHERE org_id = ?",
			[org_id],
			callback
		);
	}
};