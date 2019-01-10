const Dao = require("./dao.js");

type jsonCategory = {
	category_id: number,
	description: string
}

module.exports = class CategoryDao extends Dao{
	
	getAll (callback: mixed) {
		super.query(
			"select * FROM Category ORDER BY description",
			[],
			callback);
	}
	
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select * FROM Category WHERE category_id = ?",
			[id],
			callback
		);
	}
	
	updateCategory (json: jsonCategory, callback: mixed){
		let val = [json.description, json.category_id];
		super.query(
			"update Category set description = ? where category_id = ?",
			val,
			callback
		);
	}
	
	deleteCategoryByID(id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from Category where category_id = ?",
			[val],
			callback
		);
	}
	
	getCountCategories(callback: mixed) {
		super.query(
			"select COUNT(*) as x from Category",
			[],
			callback
		);
	}
	
};