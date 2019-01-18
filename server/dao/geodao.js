const Dao = require("./dao.js");


module.exports = class GeoDao extends Dao {
	
	/** Get all communes from Place ordered by zip code.*/
	getAllCommunes (callback: mixed) {
		super.query(
			"SELECT * FROM Place ORDER BY zipcode ASC",
			[],
			callback
		);
	}
	
	/**
	 * Get the communes county by county_id
	 * @param county_id The county_id to send to DB
	 * @param callback
	 */
	getCommunesCounty(county_id: number, callback: mixed){
		super.query(
			"SELECT * FROM fylke WHERE ID = ?",
			[county_id],
			callback
		)
	}
	
};