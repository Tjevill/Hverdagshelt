const Dao = require("./dao.js")

type jsonUpdate = {
	org_id: number,
	organisationnumber: string,
	name: string,
	email: string,
	password: number,
	
};

module.exports = class OrgDao extends Dao {
	
	getAll (callback: mixed) {
		super.query(
			"select * from Organsation",
			[],
			callback
		);
	}
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select * from Organsation where id = ?",
			[id],
			callback
		);
	}
	
	updateOrg (json: jsonUpdate, callback: mixed){
		let val = [json.organisationnumber, json.name, json.email, json.password, json.org_id];
		super.query(
			"update Org set organisationnumber = ?, name = ?, email = ?, password = ?, where org_id = ?",
			val,
			callback
		);
	}
	
	
};