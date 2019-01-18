const Dao = require("./dao.js");


module.exports = class GeoDao extends Dao {
	
	/** Get all communes from Place ordered by zip code.*/
	getAllCommunes (callback) {
		super.query(
			"SELECT * FROM Place ORDER BY zipcode ASC",
			[],
			callback
		);
	}
	
};